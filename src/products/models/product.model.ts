export enum Categoty {
  Beer = 1,
  Wine,
  Whisky
}

export class Product {
  name: string;
  description: string;
  price: number;
  category: Categoty;
  isAvailable: boolean;

  constructor(name: string, description: string, price: number, category: Categoty) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.isAvailable = true;
  }
}
