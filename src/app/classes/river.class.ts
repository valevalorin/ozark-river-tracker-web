import { Gauge } from './gauge.class';

export class River {

  public id: string;
  public name: string;
  public gauges: Gauge[];
  public centerLat: number;
  public centerLong: number;
  public zoom: number;

  constructor(
    id: string,
    name: string,
    centerLat = 36.956008,
    centerLong = -90.994107,
    zoom = 13,
    gauges = []
  ) {
    this.id = id;
    this.name = name;
    this.centerLat = centerLat;
    this.centerLong = centerLong;
    this.zoom = zoom;
    this.gauges = gauges;
  }

  public toString() {
    return this.name;
  }
}