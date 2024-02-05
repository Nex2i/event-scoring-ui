import { FieldValues } from 'react-hook-form';
import { stateAbbreviation, statesFull } from './States';

export class Address {
  street1 = '';
  street2 = '';
  street_1 = '';
  street_2 = '';
  postalCode = '';
  city = '';
  state: statesFull | stateAbbreviation | string = stateAbbreviation.Arkansas;

  fromFieldValues = (fieldValues: FieldValues) => {
    this.street1 = fieldValues.street1;
    this.street2 = fieldValues.street2;
    this.postalCode = fieldValues.postalCode;
    this.city = fieldValues.city;
    this.state = fieldValues.state;

    return this;
  };

  constructor(params?: Partial<Address>) {
    Object.assign(this, params);
    this.street1 = this.street1 || this.street_1;
    this.street2 = this.street2 || this.street_2;
  }
}
