export interface ProductInterface {
  id?: number;
  name: string;
  price: string;
}

class ProductModel {
  public id: number;
  public name: string;
  public price: string;

  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export default ProductModel;
