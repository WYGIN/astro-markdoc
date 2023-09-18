import type { ComponentConfig } from "./config";
import { componentConfigSymbol } from "./utils/component-config";

export function isComponentConfig(value: unknown): value is ComponentConfig {
	return typeof value === 'object' && value !== null && componentConfigSymbol in value;
}