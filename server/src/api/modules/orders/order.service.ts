import { BaseServiceInterface } from "@/utils/interfaces";
import { OrderInterface } from "./order.model";
import OrderRepository, { OrderRepositoryInterface } from "./order.repository";

export interface OrderServiceInterface
  extends BaseServiceInterface<OrderInterface> {}

class OrderService implements OrderServiceInterface {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async index(): Promise<OrderInterface[]> {
    const products = await this.orderRepository.index();

    return products;
  }

  async create(data: OrderInterface): Promise<OrderInterface> {
    const newProduct = await this.orderRepository.create(data);

    return newProduct;
  }

  async update(id: number, data: OrderInterface): Promise<OrderInterface> {
    const product = await this.orderRepository.findById(id);

    if (!product?.id) throw new Error("Product not found");

    const updatedProduct = await this.orderRepository.update(product.id, data);

    return updatedProduct;
  }

  async delete(id): Promise<{ id: number }> {
    const product = await this.orderRepository.findById(id);

    if (!product?.id) throw new Error("Product not found");

    const deleteProduct = await this.orderRepository.delete(id);

    return deleteProduct;
  }

  async findById(id: number): Promise<OrderInterface | null> {
    const product = await this.orderRepository.findById(id);

    if (!product) throw new Error("Product not found");

    return product;
  }
}

export default new OrderService(OrderRepository);
