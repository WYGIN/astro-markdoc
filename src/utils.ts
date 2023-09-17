export function isComponentConfig(value: unknown): value is ComponentConfig {
	return typeof value === 'object' && value !== null && componentConfigSymbol in value;
}