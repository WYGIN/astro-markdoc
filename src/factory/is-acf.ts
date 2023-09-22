import { createComponent, renderComponent, renderTemplate } from "astro/runtime/server/index.js";
import { isAstroComponentFactory, type AstroComponentFactory } from "astro/runtime/server/render/astro/factory.js";
import { getImportSafeName } from "./acf-map";

export const toACF = (component: string | object | Node | Element | AstroComponentFactory, rename?: boolean): AstroComponentFactory => {
    if(!isAstroComponentFactory(component) || rename) {
        component = acf(component);
    }
    return component as AstroComponentFactory;
    
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

export const acf = (component: string | object | Node | Element | AstroComponentFactory): AstroComponentFactory => {
    return createComponent({
        factory(result: any, props: any, slots: any) {
            return renderTemplate`${renderComponent(result, getImportSafeName(4), component, props, slots)}`
        }
    })
}