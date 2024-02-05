import { GpsCoordinates } from './GpsCoordinates';
import { Address } from './Address';
import { getState } from './States';

export type SerpLocalResult = {
  gpsCoordinates?: GpsCoordinates;
  title: string;
  address?: string;
  dataId: string;
  thumbnail: string;
  businessType: string;
  placeId?: string;
  phone: string;
  website: string;
};

export const parseSerpAddress = (address: string | undefined): Address => {
  const newAddress = new Address();

  if (!address) return newAddress;

  const addressParts = address.split(',');
  if (addressParts.length > 2 && addressParts.length <= 3) {
    newAddress.street1 = addressParts[0];
    newAddress.city = addressParts[1];

    const wideSection = addressParts[2].trim().split(' ');

    newAddress.state = getState(wideSection[0].trim()).abbreviation;
    newAddress.postalCode = wideSection[1];
  }

  return newAddress;
};
