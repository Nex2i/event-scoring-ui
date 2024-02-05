export type CheckBoxToValueTransformer<T> = (checked: boolean) => T;
export type ValueToCheckBoxTransformer<T> = (value: T) => boolean;

export const ZeroOrOneCheckBoxToValueTransformer: CheckBoxToValueTransformer<0 | 1> = (checked: boolean) =>
  checked ? 1 : 0;
export const ZeroOrOneValueToCheckBoxTransformer: ValueToCheckBoxTransformer<0 | 1> = (value: 0 | 1) => value === 1;

export const BooleanValueTransformer: CheckBoxToValueTransformer<boolean> = (checked: boolean) => checked;
