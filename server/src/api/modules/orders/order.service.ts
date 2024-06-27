import { BaseServiceInterface } from "@/utils/interfaces";
import { OrderInterface } from "./order.model";
import OrderRepository, { OrderRepositoryInterface } from "./order.repository";
import OrderProductRepository, {
  OrderProductRepositoryInterface,
} from "../order-product/order-product.repository";

export interface OrderServiceInterface
  extends BaseServiceInterface<OrderInterface> {}

class OrderService implements OrderServiceInterface {
  constructor(
    private orderRepository: OrderRepositoryInterface,
    private orderProductRepository: OrderProductRepositoryInterface
  ) {}

  async index(): Promise<OrderInterface[]> {
    const orders = await this.orderRepository.index();

    const ordersWithRelations = await Promise.all(
      orders.map(async (order) => {
        const orderId = order.id as number;

        return {
          ...order,
          orderProducts: await this.orderProductRepository.getAllByOrderId(
            orderId
          ),
          products: await this.orderRepository.getAllOrderProducts(orderId),
          client: await this.orderRepository.getOrderClient(orderId),
        };
      })
    );

    return ordersWithRelations;
  }

  async create(data: OrderInterface): Promise<OrderInterface> {
    const newOrder = await this.orderRepository.create(data);

    const products = (data.products ?? []) as any[];
    const orderId = newOrder.id as number;

    const orderProducts: any[] = [];

    for (const product of products) {
      orderProducts.push(
        await this.orderProductRepository.create({
          product_id: product.product_id,
          order_id: orderId,
          quantity: product.quantity,
          price: product.price,
        })
      );
    }

    return {
      ...newOrder,
      orderProducts,
      products: await this.orderRepository.getAllOrderProducts(orderId),
      client: await this.orderRepository.getOrderClient(orderId),
    };
  }

  async update(id: number, data: OrderInterface): Promise<OrderInterface> {
    const order = await this.orderRepository.findById(id);

    if (!order?.id) throw new Error("Order not found");

    const updatedOrder = await this.orderRepository.update(order.id, data);

    const orderId = updatedOrder.id as number;
    const products = (data.products ?? []) as any[];

    await this.orderProductRepository.deleteAllByOrderId(orderId);

    for (const product of products) {
      await this.orderProductRepository.create({
        product_id: product.product_id,
        order_id: orderId,
        quantity: product.quantity,
        price: product.price,
      });
    }

    const orderProducts = await this.orderProductRepository.getAllByOrderId(
      orderId
    );

    return {
      ...updatedOrder,
      orderProducts: orderProducts,
      products: await this.orderRepository.getAllOrderProducts(orderId),
      client: await this.orderRepository.getOrderClient(orderId),
    };
  }

  async delete(id): Promise<{ id: number }> {
    const order = await this.orderRepository.findById(id);

    if (!order?.id) throw new Error("Product not found");

    await this.orderProductRepository.deleteAllByOrderId(order.id);

    const deletedOrder = await this.orderRepository.delete(id);

    return deletedOrder;
  }

  async findById(id: number): Promise<OrderInterface | null> {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new Error("Product not found");

    const orderId = order.id as number;

    return {
      ...order,
      orderProducts: await this.orderProductRepository.getAllByOrderId(orderId),
      products: await this.orderRepository.getAllOrderProducts(orderId),
      client: await this.orderRepository.getOrderClient(orderId),
    };
  }
}

export default new OrderService(OrderRepository, OrderProductRepository);
