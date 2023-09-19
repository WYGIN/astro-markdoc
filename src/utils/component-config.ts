import type { AstroMarkdocConfig, ComponentConfig } from "@astrojs/markdoc/config";

/** Identifier for components imports passed as `tags` or `nodes` configuration. */
export const componentConfigSymbol = Symbol.for('@astrojs/markdoc/component-config');

export function isComponentConfig(value: unknown): value is ComponentConfig {
	return typeof value === 'object' && value !== null && componentConfigSymbol in value;
}

export const getComponentConfigByTagMap = (usedTags: Set<string>, userMarkdocConfig: MarkdocConfigResult) => {
    let componentConfigByTagMap: Record<string, ComponentConfig> = {};
    // Only include component imports for tags used in the document.
    // Avoids style and script bleed.
    for (const tag of usedTags) {
        const render = userMarkdocConfig.config.tags?.[tag]?.render;
        if (isComponentConfig(render)) {
            componentConfigByTagMap[tag] = render;
        }
    }

    return componentConfigByTagMap;
}

export const getComponentConfigByNodeMap = (userMarkdocConfig: MarkdocConfigResult) => {

    let componentConfigByNodeMap: Record<string, ComponentConfig> = {};
    
    for (const [nodeType, schema] of Object.entries(userMarkdocConfig.config.nodes ?? {})) {
        const render = schema?.render;
        if (isComponentConfig(render)) {
            componentConfigByNodeMap[nodeType] = render;
        }
    }

    return componentConfigByNodeMap;
}

export type MarkdocConfigResult = {
	config: AstroMarkdocConfig;
	fileUrl: URL;
};