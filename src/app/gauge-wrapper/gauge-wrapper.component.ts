import { Component, OnInit } from '@angular/core';
import { RiverService } from '../services/river.service';
import * as moment from 'moment';

@Component({
  selector: 'app-gauge-wrapper',
  templateUrl: './gauge-wrapper.component.html',
  styleUrls: ['./gauge-wrapper.component.scss']
})
export class GaugeWrapperComponent implements OnInit {

  public name: string = 'World';
  public gauge: any = {};

  public selectedMetric: string;

  public chartData = {
    datasets: [{
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(44, 44, 44, 0.4)"
        ],
        borderColor: [
          "rgba(44, 44, 44, 1.0)"
        ]
    }]
  };

  public datasets = null;
  public chartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public  chartOptions = {
    'waterLevel': {
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} ft`,
        }
      },
      scales: {
        yAxes: [{
          // scaleLabel: {
          //   display: true,
          //   labelString: '(in ft)'
          // }
          ticks: {
            userCallback: function(item) {
              return `${item} ft`;
            },
          }
        }]
      }
    },
    'dischargeRate': {
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} gl/m`,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            userCallback: function(item) {
              return `${item} gl/m`;
            },
          }
        }]
      }
    }
  }

  constructor(private riverService: RiverService) { }

  ngOnInit() {
    this.selectedMetric = 'waterLevel';
    this.riverService.getGaugeHistory(this.gauge.id).then((metrics) => {

      let datasets = {};
      datasets['waterLevel'] = [{
        label: 'Water Level',
        data: metrics.waterLevel,
        backgroundColor: [
          "rgba(44, 44, 44, 0.4)"
        ],
        borderColor: [
          "rgba(44, 44, 44, 1.0)"
        ],
        pointBackgroundColor: 'rgba(26, 133, 255, 1)',
        pointBorderColor: 'rgba(26, 133, 255, 1)',
        pointHoverBackgroundColor: 'rgba(140, 193, 253, 1)',
        pointHoverBorderColor: 'rgba(26, 133, 255, 1)'
      }];

      datasets['dischargeRate'] = [{
        label: 'Discharge Rate',
        data: metrics.dischargeRate,
        backgroundColor: [
          "rgba(44, 44, 44, 0.4)"
        ],
        borderColor: [
          "rgba(44, 44, 44, 1.0)"
        ],
        pointBackgroundColor: 'rgba(44,44,230,1)',
        pointBorderColor: 'rgba(150,150,230,1)'
      }];

      this.datasets = datasets;


      // Generate labels
      // let today = moment.now();
    });
  }

  selectMetric(metric): void {
    this.selectedMetric = metric;
  }

}
