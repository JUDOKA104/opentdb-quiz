// Fonction pour enlever les HTML entities
export function decodeHtmlEntities(str: string): string {
    if (!str) return "";
    const entities: Record<string, string> = {
        "&amp;": "&",
        "&quot;": '"',
        "&#039;": "'",
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
        "&eacute;": "é",
        "&Eacute;": "É",
    };
    return str.replace(
        /&amp;|&quot;|&#039;|&apos;|&lt;|&gt;|&eacute;|&Eacute;/g,
        (match) => entities[match] || match
    );
}