import { ClientInterface } from "../clients/client.model";

export interface OrderInterface {
  id?: number;
  date: string;
  client_id: number;
  products?: any[];
  orderProducts?: any[];
  client?: ClientInterface;
}

class OrderModel {
  public id: number;
  public date: string;
  public client_id: number;
  public products: any[];

  constructor({ id, date, client_id, products }) {
    this.id = id;
    this.date = date;
    this.client_id = client_id;
    this.products = products ?? [];
  }
}

export default OrderModel;
