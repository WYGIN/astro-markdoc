import type { ViteUserConfig } from "astro/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroConfig } from "astro";
import type { MarkdocUserConfig } from '../utils/user-config';
import type { AstroMarkdocConfig } from "../config";

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
	return `\0${id}`;
}

export function vitePluginAstroMarkdocSSr(options: MarkdocUserConfig, { root }: Pick<AstroConfig, 'root'>, markdocConfig: AstroMarkdocConfig): NonNullable<ViteUserConfig['plugins']>[number] {
    const resolveId = (id: string) =>
		JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(root), id) : id);
    const modules = {
        'virtual:wygin/user-config': ``,
        'virtual:wygin/markdoc-unique-imports': ``,
        'virtual:wygin/markdoc-config': ``,
        'virtual:wygin/project-context': ``,
    } satisfies Record<string, string>;

    	/** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	);

    return {
        name: 'vite-plugin-astro-markdoc-ssr-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id);
		},
		load(id): string | void {
			const resolution = resolutionMap[id];
			if (resolution) return modules[resolution];
		},
    }
}