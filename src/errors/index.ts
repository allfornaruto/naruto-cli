export abstract class BaseError implements Error {
  public name: string;
  public message: string;
  constructor(message: string) {
    this.name = this.constructor.name;
    this.message = message;
  }
}
