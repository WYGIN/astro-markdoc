import { createComponent, createHeadAndContent, renderComponent, renderTemplate } from "astro/runtime/server/index.js";
import { isAstroComponentFactory, type AstroComponentFactory, type AstroFactoryReturnValue } from "astro/runtime/server/render/astro/factory.js";
import { ACFMap, getImportSafeName } from "./acf-map";

export const toACF = (component: (string | object | Node | Element | AstroComponentFactory), name?: string): { component: AstroComponentFactory, name: string } => {
    if(!isAstroComponentFactory(component)) {
        toACF(component, getImportSafeName(4));
    }
    const c = component as AstroComponentFactory;
    return { component: c, name: c.name };
    
    // else {
    //     const acf: AstroComponentFactory = createComponent({
    //         factory(result: any, props: Record<string, any>) {
    //             const acfMap = ACFMap();
    //             let c : AstroFactoryReturnValue
    //             if(acfMap.has(name)) {
    //                 toACF(component, getImportSafeName(4))
    //             }
    //             return renderTemplate`${renderComponent(result, name!, component, props, {})}`
    //         },
    //     });
    //     return { component: acf, name: name! };
    // }

}