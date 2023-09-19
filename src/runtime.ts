import { Renderer } from '@astrojs/markdoc/components';
import { getMarkdocConfigPath } from './utils/markdoc-config';
import { createGetHeadings, createContentComponent, setupConfig, resolveComponentImports, mergeConfig } from '@astrojs/markdoc/runtime';
import { assetsConfig } from '@astrojs/markdoc/runtime-assets-config';
import { type ComponentConfig } from '@astrojs/markdoc/config';
import { type AstroConfig, type MarkdownInstance } from 'astro';
import { getMarkdocTokenizer } from './tokenizer';
import type { MarkdocIntegrationOptions } from './options';
import { getEntryInfo } from './utils/content';
import { htmlTokenTransform } from './html/transform/html-token-transform';
import Markdoc from '@markdoc/markdoc';
import { getStringifiedImports, getStringifiedMap } from './utils/imports';
import { createComponent, type AstroComponentFactory, renderComponent } from 'astro/runtime/server/index.js';

export const getRenderer = async (componentConfigByTagMap: Record<string, ComponentConfig>, componentConfigByNodeMap: Record<string, ComponentConfig>, astroConfig: AstroConfig, options: MarkdocIntegrationOptions, ast: Node | Node[]) => {
    const markdocConfig = await import(getMarkdocConfigPath()) ?? {};
    markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };
    getStringifiedImports(componentConfigByTagMap, 'Tag', astroConfig.root).forEach(async item => {
        [item.name]  = await import(item.path);
    });
    getStringifiedImports(componentConfigByNodeMap, 'Node', astroConfig.root).forEach(async item => {
        [item.name] = await import(item.path);
    });

    const tagComponentMap = getStringifiedMap(componentConfigByTagMap, 'Tag');
    const nodeComponentMap = getStringifiedMap(componentConfigByNodeMap, 'Node');
    const stringifiedAst = //JSON.stringify(
        /* Double stringify to encode *as* stringified JSON */ JSON.stringify(ast)
    //);

    const getHeadings = createGetHeadings(stringifiedAst, markdocConfig, options);
    const Content = createContentComponent(
        Renderer,
        stringifiedAst,
        markdocConfig,
        options,
        tagComponentMap,
        nodeComponentMap
    );

    return { getHeadings, Content };
}

export const getParsedAst = (fileUrl: URL, contents: string, options: MarkdocIntegrationOptions) => {
    const entry = getEntryInfo({ contents, fileUrl });
    const tokenizer = getMarkdocTokenizer(options);
    let tokens = tokenizer.tokenize(entry.body);

    if (options?.allowHTML) {
        tokens = htmlTokenTransform(tokenizer, tokens);
    }
    const ast = Markdoc.parse(tokens);
    return ast;
}