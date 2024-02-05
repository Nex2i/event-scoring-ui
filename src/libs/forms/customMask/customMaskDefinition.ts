import { Definitions as MaskedDefinitions } from 'imask';

export interface CustomMaskDefinition {
  mask: string | RegExp | Array<RegExp | string> | NumberConstructor | StringConstructor | DateConstructor;
  definitions: MaskedDefinitions;
  thousandsSeparator?: string;
  min?: number;
  max?: number;
  overwrite?: boolean;
}

export const ThousandsSeparatedNumberMaskDefinition: CustomMaskDefinition = {
  mask: Number,
  definitions: {},
  thousandsSeparator: ',',
};

export const PhoneNumberMaskDefinition: CustomMaskDefinition = {
  mask: '(000) 000-0000',
  definitions: {},
};

export const ZipMaskDefinition: CustomMaskDefinition = {
  mask: '00000',
  definitions: {},
};

export const DateMaskDefinition: CustomMaskDefinition = {
  mask: `00/00/0000`,
  definitions: {},
};
