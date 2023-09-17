import type { AstroIntegration } from "astro";

const AstroMarkdoc = (): AstroIntegration => {
    return {
        name: '@wygininc/astro-markdoc',
        hooks: {
            'astro:config:setup': async (params) => {

            },

            'astro:server:setup': async ({ server }) => {
                
            }
        }
    }
}