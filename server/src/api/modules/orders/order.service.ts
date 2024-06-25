export interface OrderServiceInterface {
  index(): Promise<any[]>;
  create(): Promise<any>;
  update(): Promise<any>;
  delete(): Promise<any>;
}

class OrderService implements OrderServiceInterface {
  index(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  create(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default new OrderService();
