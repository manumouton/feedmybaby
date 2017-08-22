export class Meal{

  constructor() {
    this.datetime = new Date().toISOString();
  }

  public id: any;

  public datetime: string;

  public quantity: number;
}
