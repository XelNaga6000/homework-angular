export enum Categoty {
  Beer = 1,
  Wine,
  Whisky
}

export class Product {
  // name: string;
  // description: string;
  // price: number;
  // category: Categoty;
  // isAvailable: boolean;

  // альтернативный вариант
  constructor(public name: string, public description: string, public price: number,
              public category: Categoty, public isAvailable = true) {
    // this.name = name;
    // this.description = description;
    // this.price = price;
    // this.category = category;
    // this.isAvailable = true;
  }
}
