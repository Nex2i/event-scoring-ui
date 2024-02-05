import { Address } from '@/types/location/Address';
import { stringToProper } from '@/utils/string.helper';

export const formatAddress = (address: Address): string => {
  return `
    ${stringToProper(address.street1)},
    ${stringToProper(address.city)}
    ${stringToProper(address.state)},
    ${stringToProper(address.postalCode)}
  `;
};
