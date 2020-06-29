import { Injectable } from '@angular/core';
import { River } from '../classes/river.class';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gauge } from '../classes/gauge.class';
import { Metric } from '../classes/metric.class';

@Injectable({
  providedIn: 'root'
})
export class RiverService {

  constructor(private http: HttpClient) { }

  public getRivers(): Promise<River[]> {
    return new Promise(async (resolve, reject) => {

      try {
        let results: River[] = [];
        let response = await this.http.get(environment.API_HOST + '/api/rivers');
        // console.log(response);
        response.subscribe((riversResult: any) => {
          riversResult.rivers.forEach((river) => {
            results.push(new River(
              river.Id,
              river.Name,
              river.Latitude,
              river.Longitude,
              13,
              []
            ));
          });

          resolve(results);
        });
      } catch (ex) {
        console.log(ex);
        reject();
      }
      
      // resolve([
      //   new River(
      //     0,
      //     'Current River',
      //     36.956008,
      //     -90.994107,
      //     13,
      //     [
      //       {
      //         name: "Aker's Ferry",
      //         lat: 36.956008,
      //         long: -90.994107,
      //         metrics: {
      //           waterLevel: 6.7,
      //           dischargeRate: 12.3
      //         }
      //       },
      //       {
      //         name: "Other Longer Name Man",
      //         lat: 36.976057, 
      //         long: -90.983201,
      //         metrics: {
      //           waterLevel: 6.7,
      //           dischargeRate: 12.3
      //         }
      //       }
      //     ]
      //   ),
      //   new River(
      //     1,
      //     "Jack's Fork",
      //     37.147742,
      //     -91.441354,
      //     13,
      //     [
      //       {
      //         lat: 37.147742,
      //         long: -91.441354
      //       }
      //     ]
      //   )
      // ]);
    });
    
  }

  public getGauges(riverId: string): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.http.get(environment.API_HOST + '/api/rivers/' + riverId + '/gauges');
        // console.log(response);
        response.subscribe((gaugesResult: any) => {
          let gauges: Gauge[] = [];
          let promises = [];
          gaugesResult.gauges.forEach((gaugeDto) => {
            let gauge = new Gauge(
              gaugeDto.Id,
              gaugeDto.Name,
              gaugeDto.Latitude,
              gaugeDto.Longitude
            );
            gauges.push(gauge);

            let p = this.getGaugeMetrics(gauge.id);
            promises.push(p);

            p.then((metrics) => {
              let days_30 = metrics.slice(metrics.length - 2880, metrics.length);
              let waterLevels = [];
              let dischargeRates = [];
              days_30.forEach((metric) => {
                if (metric.Type == 'height') {
                  waterLevels.push(new Metric(
                    metric.Value,
                    metric.RecordedDate
                  ));
                } else if (metric.Type == 'discharge') {
                  dischargeRates.push(new Metric(
                    metric.Value,
                    metric.RecordedDate
                  ));
                }
              });

              gauge.mostRecent.waterLevel = waterLevels[waterLevels.length - 1];
              gauge.mostRecent.dischargeRate = dischargeRates[dischargeRates.length - 1];

              gauge.waterLevels = waterLevels;
              gauge.dischargeRates = dischargeRates;
            });
          });

          Promise.all(promises).then(() => {
            resolve(gauges);
          }, () => {
            reject();
          });
        });
      } catch (ex) {
        console.log(ex);
        reject();
      }
    });
  }

  public getGaugeMetrics(gaugeId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.http.get(environment.API_HOST + '/api/gauges/' + gaugeId + '/metrics');

        response.subscribe((results: any) => {
          resolve(results.metrics);
        });
      } catch (ex) {
        console.error(ex);
        reject();
      }
    });
  }

  public getGaugeHistory(gaugeId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({
        'waterLevel': [1,2,3,4,5,6,7],
        'dischargeRate': [7,6,5,4,3,2,1]
      });
    }); 
  }
}
