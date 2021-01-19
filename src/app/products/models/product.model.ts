export enum Categoty {
  Beer = 1,
  Wine,
  Whisky
}

export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: Categoty,
    public isAvailable = true
  ) { }
}
