import db from "../../../config/connect.mysql";

import { BaseRepositoryInterface } from "@/utils/interfaces";
import { OrderProductInterface } from "./order-product.model";
import { ResultSetHeader } from "mysql2";

export interface OrderProductRepositoryInterface
  extends BaseRepositoryInterface<OrderProductInterface> {}

class OrderProductRepository implements OrderProductRepositoryInterface {
  private tableName = "order_product";

  async index(): Promise<OrderProductInterface[]> {
    const [results] = await db.query(`SELECT * FROM ${this.tableName}`, []);

    const products = results as OrderProductInterface[];

    return products;
  }

  async create(data: OrderProductInterface): Promise<OrderProductInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `INSERT INTO ${this.tableName} (product_id, order_id, price, quantity) VALUES (?, ?, ?, ?)`,
      [data.product_id, data.order_id, data.price, data.quantity]
    );

    const productId = results.insertId;

    if (!productId) throw new Error("Error during order product creation");

    const product = await this.findById(productId);

    return product as OrderProductInterface;
  }

  async update(
    id: number,
    data: OrderProductInterface
  ): Promise<OrderProductInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `UPDATE ${this.tableName} SET product_id = ?, order_id = ?, price = ?, quantity = ? WHERE id = ${id};`,
      [data.product_id, data.order_id, data.price, data.quantity]
    );

    if (!results.affectedRows)
      throw new Error("Error during order product update");

    const product = await this.findById(id);

    return product as OrderProductInterface;
  }

  async delete(id: number): Promise<{ id: number }> {
    const [results] = await db.query<ResultSetHeader>(
      `DELETE FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results.affectedRows)
      throw new Error("Error during order product delete");

    return { id };
  }

  async findById(id: number): Promise<OrderProductInterface | null> {
    const [results] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results[0]) return null;

    const product = results[0] as OrderProductInterface;

    return product;
  }
}

export default new OrderProductRepository();
