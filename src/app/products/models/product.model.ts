export enum Category {
  Beer = 1,
  Wine,
  Whisky
}

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: Category;
  isAvailable?: boolean;
}

export class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: Category,
    public isAvailable = true
  ) { }
}
