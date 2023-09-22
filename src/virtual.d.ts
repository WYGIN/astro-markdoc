/**
 * 
 * this file contains the definations of the virtual modules used in this project
 * 
 */

declare module 'virtual:wygin/user-config' {
    const Config: import('./utils/user-config').MarkdocUserConfig;
    export default Config;
}

// declare module 'virtual:wygin/astro-markdoc-config' {
//     const Config: import('./config').AstroMarkdocConfig;
//     return Config;
// }

declare module 'virtual:wygin/markdoc-unique-imports' {
    const Config: import('./factory/acf-map').acfMap;
    export default Config;
}

declare module 'virtual:wygin/markdoc-config' {
    const Config: import('@markdoc/markdoc').Config;
    export default Config;
}

declare module 'virtual:wygin/project-context' {
    const Config: { root: string };
    export default Config;
}

declare module 'virtual:wygin/astro-markdoc-ssr-renderer' {
    const Config: import('astro/runtime/server/index.js').AstroComponentFactory;
    export default Config;
}