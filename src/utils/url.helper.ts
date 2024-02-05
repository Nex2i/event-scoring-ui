const httpReg = new RegExp('/^((http|https|ftp)://)/');

export const createUrl = (url: string): string => {
  if (httpReg.test(url)) {
    return url;
  }
  return `https://${url}`;
};
