import type { AstroIntegration } from "astro";
import type { MarkdocUserConfig } from "./astro-markdoc-ssr";

export default function AstroMarkdocSSR(options: MarkdocUserConfig): AstroIntegration[] {
    return [AstroMarkdocSSRConfig(), AstroMarkdocSSRRenderer()]
}

const AstroMarkdocSSRConfig = (): AstroIntegration => {
    return {
        'name': '@wygininc/astro-markdoc-ssr-config',
        hooks: {

        }
    }
}

const AstroMarkdocSSRRenderer = (): AstroIntegration => {
    return {
        'name': '@wygininc/astro-markdoc-ssr-renderer',
        hooks: {

        }
    }
}