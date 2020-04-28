export function toTitleCase(str = '') {
    return str[0].toUpperCase() + str.slice(1);
}

export function truncateToNextClosestWord(str = '', limit, trailing = '') {
    if (str.length <= limit) return str;
    const wordBreak = str.slice(limit).search(/\s/);
    const content = wordBreak === -1 ? str : str.slice(0, limit + wordBreak);

    return `${content}${trailing}`;
}
