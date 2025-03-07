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
  for (let index = 0; index < separations; index++) {
    if (residuo != 0) {
      if (index == 0) {
        rs = rs + str.substring(0, residuo) + ','
      }
    }
    const separator = (index != separations-1)?  ',' : '';
    rs = rs + str.substring(index * 3, (index * 3) + 3)+separator
  }
  return rs;
}
