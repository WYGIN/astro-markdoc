import type { AstroConfig, ViteUserConfig } from 'astro';
import type { AstroMarkdocConfig } from '../utils/user-config';

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
	return `\0${id}`;
}

/** Vite plugin that exposes Markdoc config and project context via virtual modules. */
export function vitePluginStarlightUserConfig(
	opts: AstroMarkdocConfig,
	{ root }: Pick<AstroConfig, 'root'>
): NonNullable<ViteUserConfig['plugins']>[number] {

	/** Map of virtual module names to their code contents as strings. */
	const modules = {
		'virtual:wygin/markdoc-config': `export default ${JSON.stringify(opts)}`,
		'virtual:wygin/project-context': `export default ${JSON.stringify({ root })}`,
	} satisfies Record<string, string>;

	/** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	);

	return {
		name: 'vite-plugin-wygin-markdoc-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id);
		},
		load(id): string | void {
			const resolution = resolutionMap[id];
			if (resolution) return modules[resolution];
		},
	};
}