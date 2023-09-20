import type { AstroComponentFactory } from "astro/runtime/server/index.js"
import { isAstroComponentFactory } from "astro/runtime/server/render/astro/factory.js";
import { customAlphabet } from 'nanoid/non-secure';
import { toACF } from "./is-acf";

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ');
export const acfMap = new Map<string, AstroComponentFactory>();

export const ACFMap = (): typeof acfMap => {
    const add = (component: (Element | Node | AstroComponentFactory), name?: string): void => {
        if(isAstroComponentFactory(component)) {
            acfMap.has(component.name) && name ? (acfMap.has(name) ? add(component, getImportSafeName(4)) : acfMap.set(name, component)) : add(component, getImportSafeName(4))
        }
        const acf = toACF(component);
        acfMap.has(acf.component.name) ? add(component, getImportSafeName(4)) : acfMap.set(acf.component.name, acf.component)
    }

    return acfMap
}

export const getImportSafeName = (size: number) => {
    return nanoid(size);
}