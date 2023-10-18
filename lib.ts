import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export function sanitize(entry: string) {
    const parser = new DOMParser();
    const html = parser.parseFromString(entry, 'text/html');
    return html?.children[0].innerHTML;
}
