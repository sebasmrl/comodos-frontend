export const toUpperCamelCase = (str: string) => {
  return str.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export const toLegiblePriceFormat = (value: number) => {
  const str = `${value}`;
  const separations = Math.floor(str.length / 3);
  const residuo = str.length % 3;
  let rs = '';

  if (residuo > 0) {
    rs += str.substring(0, residuo);
    if (separations > 0) rs += ',';
  }

  for (let index = 0; index < separations; index++) {
    const start = residuo + index * 3;
    const end = residuo + (index + 1) * 3;
    rs += str.substring(start, end);
    if (index < separations - 1) rs += ',';
  }

  return rs;
};
