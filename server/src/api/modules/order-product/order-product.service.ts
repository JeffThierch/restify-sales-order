import { BaseServiceInterface } from "@/utils/interfaces";
import { OrderProductInterface } from "./order-product.model";
import OrderProductRepository, {
  OrderProductRepositoryInterface,
} from "./order-product.repository";

export interface OrderProductServiceInterface
  extends BaseServiceInterface<OrderProductInterface> {}

class OrderProductService implements OrderProductServiceInterface {
  constructor(
    private orderProductRepository: OrderProductRepositoryInterface
  ) {}

  async index(): Promise<OrderProductInterface[]> {
    const products = await this.orderProductRepository.index();

    return products;
  }

  async create(data: OrderProductInterface): Promise<OrderProductInterface> {
    const newProduct = await this.orderProductRepository.create(data);

    return newProduct;
  }

  async update(
    id: number,
    data: OrderProductInterface
  ): Promise<OrderProductInterface> {
    const product = await this.orderProductRepository.findById(id);

    if (!product?.id) throw new Error("Order Product not found");

    const updatedProduct = await this.orderProductRepository.update(
      product.id,
      data
    );

    return updatedProduct;
  }

  async delete(id): Promise<{ id: number }> {
    const product = await this.orderProductRepository.findById(id);

    if (!product?.id) throw new Error("Order Product not found");

    const deleteProduct = await this.orderProductRepository.delete(id);

    return deleteProduct;
  }

  async findById(id: number): Promise<OrderProductInterface | null> {
    const product = await this.orderProductRepository.findById(id);

    if (!product) throw new Error("Order Product not found");

    return product;
  }
}

export default new OrderProductService(OrderProductRepository);
