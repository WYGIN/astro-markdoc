import type { AstroConfig, AstroIntegration } from "astro";
import type { MarkdocUserConfig } from "./utils/user-config";
import type { AstroUserConfig } from "astro/config";
import { vitePluginAstroMarkdocSSr } from "./vite/astro-markdoc-ssr";
import type { AstroMarkdocConfig, Render } from "./config";
import * as fs from 'node:fs';
import path from "node:path";
import { getMarkdocPath, type MarkdocPath } from "./utils/user-config";
import type { Config, NodeType, Schema } from "@markdoc/markdoc";

export default function AstroMarkdocSSR(options: MarkdocUserConfig): AstroIntegration {
    return AstroMarkdocSSRConfig(options)
}

const AstroMarkdocSSRConfig = (options: MarkdocUserConfig): AstroIntegration => {
    return {
        'name': '@wygininc/astro-markdoc-ssr-config',
        hooks: {
            'astro:config:setup': ({ config, updateConfig }) => {
                const userConfig: AstroUserConfig = {
                    vite: {
                        plugins: [vitePluginAstroMarkdocSSr(options, config, markdocUserConfig(config, options.markdocPath))]
                    }
                };
                updateConfig(userConfig);
            }
        }
    }
}

const markdocUserConfig = ({ root }: AstroConfig, path?: MarkdocPath): AstroMarkdocConfig => {
    const { nodes, tags, partials, variables, functions } = getMDocFiles(root, path);
    const getNodes = (): Partial<Record<NodeType, Schema<Config, Render>>> => {
        return {
            
        }
    }
    return {
        nodes: {

        }
    }
}

const getMDocFiles = ( root: AstroConfig['root'], path?: MarkdocPath) => {
    const mdocPath = getMarkdocPath(path);
    const tags: URL[] | undefined= getFilesWithExtentions(new URL(root.pathname + mdocPath.tags, root), markdocFileRegex);
    const nodes: URL[] | undefined= getFilesWithExtentions(new URL(root.pathname + mdocPath.nodes, root), markdocFileRegex);
    const partials: URL[] | undefined= getFilesWithExtentions(new URL(root.pathname + mdocPath.partials, root), markdocFileRegex);
    const variables: URL[] | undefined= getFilesWithExtentions(new URL(root.pathname + mdocPath.variables, root), markdocFileRegex);
    const functions: URL[] | undefined= getFilesWithExtentions(new URL(root.pathname + mdocPath.functions, root), markdocFileRegex);

    return { nodes, tags, variables, functions, partials }
}

const markdocFiles: Array<URL> = [];
const markdocFileRegex = /\.(md|mdoc)$/;

const getFilesWithExtentions = (dir: string | URL, extentions: RegExp) => {
    const files = fs.readdirSync(dir);
    for(const file of files) {
        const filepath = new URL(file, dir);
        if(fs.statSync(filepath).isDirectory()) {
            getFilesWithExtentions(filepath, extentions);
        } else {
            if(extentions.test(filepath.href)) {
                markdocFiles.push(filepath);
            }
        }
    }
    const fileList = markdocFiles;
    markdocFiles.length = 0;
    return fileList;
}

// const AstroMarkdocSSRRenderer = (): AstroIntegration => {
//     return {
//         'name': '@wygininc/astro-markdoc-ssr-renderer',
//         hooks: {

//         }
//     }
// }