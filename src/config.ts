import type { AstroInstance } from "astro";
import { componentConfigSymbol } from './utils/component-config';

export type Render = ComponentConfig | AstroInstance['default'] | string;
export type ComponentConfig = {
	type: 'package' | 'local';
	path: string;
	namedExport?: string;
	[componentConfigSymbol]: true;
};