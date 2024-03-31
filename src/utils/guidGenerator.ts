export function generateCharGUID(totalChar: number = 5): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < totalChar; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
