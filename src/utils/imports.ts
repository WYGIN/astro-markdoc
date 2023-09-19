import type { ComponentConfig } from "@astrojs/markdoc/config";
import { renderComponent, type AstroComponentFactory } from "astro/runtime/server/index.js";
import type { AstroFactoryReturnValue } from "astro/runtime/server/render/astro/factory.js";

export const getStringifiedImports = (
    componentConfigMap: Record<string, ComponentConfig>,
	componentNamePrefix: string,
	root: URL
) => {
	let imports: Array<{ name: string, path: string }> = [];
	for(const [key, config] of Object.entries(componentConfigMap)) {
		imports.push({ 
			name: componentNamePrefix + toImportName(key), 
			path:  config.type === 'local' ? new URL(config.path, root).pathname : config.path
		});
	}

	return imports;
    // let stringifiedComponentImports = '';
	// for (const [key, config] of Object.entries(componentConfigMap)) {
	// 	const importName = config.namedExport
	// 		? `{ ${config.namedExport} as ${componentNamePrefix + toImportName(key)} }`
	// 		: componentNamePrefix + toImportName(key);
	// 	const resolvedPath =
	// 		config.type === 'local' ? new URL(config.path, root).pathname : config.path;

	// 	stringifiedComponentImports += `import ${importName} from ${JSON.stringify(resolvedPath)};\n`;
	// }
	// return stringifiedComponentImports;

}

function toImportName(unsafeName: string) {
	// TODO: more checks that name is a safe JS variable name
	return unsafeName.replace('-', '_');
}

export const getStringifiedMap = (
    componentConfigMap: Record<string, ComponentConfig>,
	componentNamePrefix: string
): Record<string, AstroComponentFactory> => {
	let map: Record<string, AstroComponentFactory> = {};
	for(const key in componentConfigMap) {
		map[key] = (componentNamePrefix + toImportName(key)) as unknown as AstroComponentFactory
	}

	return map;

    // let stringifiedComponentMap = '{';
	// for (const key in componentConfigMap) {
	// 	stringifiedComponentMap += `${JSON.stringify(key)}: ${
	// 		componentNamePrefix + toImportName(key)
	// 	},\n`;
	// }
	// stringifiedComponentMap += '}';
	// return stringifiedComponentMap;
}