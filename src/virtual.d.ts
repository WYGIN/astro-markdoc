import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { acfMap } from './factory/acf-map';

/**
 * 
 * this file contains the definations of the virtual modules used in this project
 * 
 */

declare module 'virtual:wygin/user-config' {
    const Config: import('./utils/user-config').AstroMarkdocConfig;
    return Config;
}

// declare module 'virtual:wygin/astro-markdoc-config' {
//     const Config: import('./config').AstroMarkdocConfig;
//     return Config;
// }

declare module 'virtual:wygin/markdoc-unique-imports' {
    return typeof acfMap;
}

declare module 'virtual:wygin/markdoc-config' {
    const Config: import('@markdoc/markdoc').Config;
    return Config;
}

declare module 'virtual:wygin/project-context' {
    export default { root: string };
}