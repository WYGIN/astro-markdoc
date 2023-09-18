import type { ComponentConfig } from "../config";

/** Identifier for components imports passed as `tags` or `nodes` configuration. */
export const componentConfigSymbol = Symbol.for('@wygininc/astro-markdoc/component-config');

export function isComponentConfig(value: unknown): value is ComponentConfig {
	return typeof value === 'object' && value !== null && componentConfigSymbol in value;
}