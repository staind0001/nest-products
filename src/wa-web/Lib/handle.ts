



export const isvalidNumber = (rawNumber) => {
    const regexGroup = /\@g.us\b/gm;
    const exist = rawNumber.match(regexGroup);
    return !exist;
}


export const cleanNumber = (number) => {
    number = number.replace('@c.us','');
    number = `${number}@c.us`;
    return number;
}