export enum Category {
  Beer = 1,
  Wine,
  Whisky
}

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: Category,
    public isAvailable = true
  ) { }
}
