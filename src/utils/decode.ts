import { decode } from 'html-entities';

export function decodeHtmlEntities(str: string): string {
    if (!str) return "";
    return decode(str);
}