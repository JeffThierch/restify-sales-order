export interface OrderProductInterface {
  id?: number;
  product_id: number;
  order_id: number;
  quantity: number;
  price: number;
}

class OrderProductModel {
  public id: number;
  public product_id: number;
  public order_id: number;
  public quantity: number;
  public price: number;

  constructor({ id, product_id, order_id, quantity, price }) {
    this.id = id;
    this.product_id = product_id;
    this.order_id = order_id;
    this.quantity = quantity;
    this.price = price;
  }
}

export default OrderProductModel;
