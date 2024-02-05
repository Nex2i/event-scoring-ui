export class GpsCoordinates {
  latitude?: number;
  longitude?: number;

  constructor(params?: Partial<GpsCoordinates>) {
    Object.assign(this, params);
  }
}
