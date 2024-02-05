const phoneRegex = /(?:^|\D)\(([2-9])(?:\d(?!\1)\d|(?!\1)\d\d)\)\s*[2-9]\d{2}-\d{4}/;

export const phone = {
  regex: phoneRegex,
  regExp: new RegExp(phoneRegex),
  validate: (phoneNumber?: string | null): boolean => {
    if (!phoneNumber) return false;
    return new RegExp(phone.regex).test(phoneNumber);
  },
  format: (value: string): string => {
    if (!value) return value;
    const input = value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
      return `(${areaCode}) ${middle}-${last}`;
    } else if (input.length > 3) {
      return `(${areaCode}) ${middle}`;
    } else if (input.length > 0) {
      return `(${areaCode}${input.length > 2 ? ')' : ''}`;
    }
    return value;
  },
  clean: (phoneNumber: string) => phoneNumber.replace(/\D+/g, ''),
};
