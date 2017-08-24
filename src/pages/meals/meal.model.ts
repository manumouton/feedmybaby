export class Meal{

  constructor() {
    this.datetime = new Date().toISOString();
  }

  public datetime: string;

  public quantity: number;
}
