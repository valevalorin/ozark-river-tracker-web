import * as moment from 'moment';

export class Metric {

  public value: number;
  public date: string;

  constructor(
    value: number,
    date: string
  ) {
    this.value = value;
    
    let m = moment(date);
    this.date = m.format('M/D/YYYY H:mm');
  }
}