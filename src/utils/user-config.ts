import type path from "path";

export interface MarkdocUserConfig {
    allowHTML?: boolean;
    markdocPath?: MarkdocPath;
}

// '/markdoc' |
// | {
//     base?: '/markdoc',
//     nodes: '/nodes',
//     tags: '/tags',
//     variables: '/variables',
//     functions: '/functions',
//     partials: '/partials',
// }

type FSPath = `/${string}`;

const __MarkdocPathSymbol = Symbol.for('@wygininc/types:MarkdocPath');

export type MarkdocPath = MarkdocPathObj | FSPath;

export type MarkdocPathObj = {
    readonly [__MarkdocPathSymbol]: true,
    base?: FSPath,
    nodes: FSPath,
    tags: FSPath,
    variables: FSPath,
    functions: FSPath,
    partials: FSPath,
}

export const getMarkdocPath = (path?: MarkdocPath): { nodes: string, tags: string, variables: string, functions: string, partials: string } => {
    let nodes, tags, variables, functions, partials: string;
    if(path && isMarkdocPathObj(path)) {
        if(path.base) {
            nodes = `${path.base}${path.nodes}`;
            tags = `${path.base}${path.tags}`;
            variables = `${path.base}${path.variables}`;
            functions = `${path.base}${path.functions}`;
            partials = `${path.base}${path.partials}`;
            return { nodes, tags, variables, functions, partials }
        }
        return { nodes: `/markdoc${path.nodes}`, tags: `/markdoc${path.tags}`, variables: `/markdoc${path.variables}`, functions: `/markdoc${path.functions}`, partials: `/markdoc${path.partials}` }
    } else if(path && !isMarkdocPathObj(path))
        return { nodes: `${path}/nodes` , tags: `${path}/tags`, variables: `${path}/variables`, functions: `${path}/functions`, partials: `${path}/partials` }
    else return { nodes: `/markdoc/nodes`, tags: `/markdoc/tags`, variables: `/markdoc/variables`, functions: `/markdoc/functions`, partials: `/markdoc/partials` }
}

export const isMarkdocPathObj = (path: any): path is MarkdocPathObj => {
    return path === 'object' && path !== null && __MarkdocPathSymbol in path
}