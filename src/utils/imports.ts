import type { ComponentConfig } from "../config";

/**
 * Get stringified import statements for configured tags or nodes.
 * `componentNamePrefix` is appended to the import name for namespacing.
 *
 * Example output: `import Tagaside from '/Users/.../src/components/Aside.astro';`
 */
export function getStringifiedImports(
	componentConfigMap: Record<string, ComponentConfig>,
	componentNamePrefix: string,
	root: URL
) {
	let stringifiedComponentImports = '';
	for (const [key, config] of Object.entries(componentConfigMap)) {
		const importName = config.namedExport
			? `{ ${config.namedExport} as ${componentNamePrefix + toImportName(key)} }`
			: componentNamePrefix + toImportName(key);
		const resolvedPath =
			config.type === 'local' ? new URL(config.path, root).pathname : config.path;

		stringifiedComponentImports += `import ${importName} from ${JSON.stringify(resolvedPath)};\n`;
	}
	return stringifiedComponentImports;
}

function toImportName(unsafeName: string) {
	// TODO: more checks that name is a safe JS variable name
	return unsafeName.replace('-', '_');
}

/**
 * Get a stringified map from tag / node name to component import name.
 * This uses the same `componentNamePrefix` used by `getStringifiedImports()`.
 *
 * Example output: `{ aside: Tagaside, heading: Tagheading }`
 */
export function getStringifiedMap(
	componentConfigMap: Record<string, ComponentConfig>,
	componentNamePrefix: string
) {
	let stringifiedComponentMap = '{';
	for (const key in componentConfigMap) {
		stringifiedComponentMap += `${JSON.stringify(key)}: ${
			componentNamePrefix + toImportName(key)
		},\n`;
	}
	stringifiedComponentMap += '}';
	return stringifiedComponentMap;
}