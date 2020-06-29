export class Metric {

  public value: number;
  public date: string;

  constructor(
    value: number,
    date: string
  ) {
    this.value = value;
    this.date = date;
  }
}