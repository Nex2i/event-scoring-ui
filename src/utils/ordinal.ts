export function getOrdinal(n: number): string {
  let suffix = 'th';
  if (n % 100 < 11 || n % 100 > 13) {
    switch (n % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
    }
  }
  return n + suffix;
}
