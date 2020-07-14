export class Gauge {

  public id: string;
  public name: string;
  public lat: number;
  public long: number;
  public waterLevels: any[] = [];
  public dischargeRates: any[] = [];
  public mostRecent: {
    waterLevel: null,
    dischargeRate: null
  };

  constructor(
    id: string,
    name: string,
    lat = 36.956008,
    long = -90.994107
  ) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.mostRecent = {
      waterLevel: null,
      dischargeRate: null
    };
  }

  public toString() {
    return this.name;
  }
}