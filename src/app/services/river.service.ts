import { Injectable } from '@angular/core';
import { River } from '../classes/river.class';

@Injectable({
  providedIn: 'root'
})
export class RiverService {

  constructor() { }

  public getRivers(): Promise<River[]> {
    return new Promise((resolve, reject) => {
      resolve([
        new River(
          0,
          'Current River',
          36.956008,
          -90.994107,
          13,
          [
            {
              name: "Aker's Ferry",
              lat: 36.956008,
              long: -90.994107,
              metrics: {
                waterLevel: 6.7,
                dischargeRate: 12.3
              }
            },
            {
              name: "Other Longer Name Man",
              lat: 36.976057, 
              long: -90.983201,
              metrics: {
                waterLevel: 6.7,
                dischargeRate: 12.3
              }
            }
          ]
        ),
        new River(
          1,
          "Jack's Fork",
          37.147742,
          -91.441354,
          13,
          [
            {
              lat: 37.147742,
              long: -91.441354
            }
          ]
        )
      ]);
    });
    
  }
}
