export interface OrderInterface {
  id?: number;
  date: string;
  client_id: number;
}

class OrderModel {
  public id: number;
  public date: string;
  public client_id: number;

  constructor({ id, date, client_id }) {
    this.id = id;
    this.date = date;
    this.client_id = client_id;
  }
}

export default OrderModel;
