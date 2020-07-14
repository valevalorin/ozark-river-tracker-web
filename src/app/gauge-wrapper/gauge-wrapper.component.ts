import { Component, OnInit, Input } from '@angular/core';
import { RiverService } from '../services/river.service';
import * as moment from 'moment';
import { Gauge } from '../classes/gauge.class';

@Component({
  selector: 'app-gauge-wrapper',
  templateUrl: './gauge-wrapper.component.html',
  styleUrls: ['./gauge-wrapper.component.scss']
})
export class GaugeWrapperComponent implements OnInit {

  @Input() public gauge: Gauge = null;

  public selectedMetric: string;

  public datasets = null;

  public  chartOptions = {
    'waterLevel': {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Depth (ft)"
      },
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} ft`,
        }
      },
      scales: {
        xAxes: [{
          type: 'time'
        }],
        yAxes: [{
          ticks: {
            userCallback: function(item) {
              let converted = item.toFixed(2);
              return `${converted}`;
            },
          }
        }]
      }
    },
    'dischargeRate': {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Rate (ft³/s)'
      },
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} ft³/s`,
        }
      },
      scales: {
        xAxes: [{
          type: 'time'
        }],
        yAxes: [{
          ticks: {
            userCallback: function(item) {
              return `${item}`;
            },
          }
        }]
      }
    }
  }

  constructor(private riverService: RiverService) { }

  ngOnInit() {
    this.selectedMetric = 'waterLevel';

    let datasets = {};
    let waterLevels = this.gauge.waterLevels.map((metric) => {
      return {
        x: metric.date,
        y: metric.value
      };
    });

    let dischargeRates = this.gauge.dischargeRates.map((metric) => {
      return {
        x: metric.date,
        y: metric.value
      };
    });

    datasets['waterLevel'] = [{
      label: 'Water Level',
      data: waterLevels,
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
      data: dischargeRates,
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

    this.datasets = datasets;
  }

  selectMetric(metric): void {
    this.selectedMetric = metric;
  }

}
