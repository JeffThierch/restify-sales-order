import db from "../../../config/connect.mysql";

import { BaseRepositoryInterface } from "@/utils/interfaces";
import { OrderInterface } from "./order.model";
import { ResultSetHeader } from "mysql2";

export interface OrderRepositoryInterface
  extends BaseRepositoryInterface<OrderInterface> {}

class OrderRepository implements OrderRepositoryInterface {
  private tableName = "orders";

  async index(): Promise<OrderInterface[]> {
    const [results] = await db.query(`SELECT * FROM ${this.tableName}`, []);

    const orders = results as OrderInterface[];

    return orders;
  }

  async create(data: OrderInterface): Promise<OrderInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `INSERT INTO ${this.tableName} (date, client_id) VALUES (?, ?)`,
      [data.date, data.client_id]
    );

    const orderId = results.insertId;

    if (!orderId) throw new Error("Error during order creation");

    const order = await this.findById(orderId);

    return order as OrderInterface;
  }

  async update(id: number, data: OrderInterface): Promise<OrderInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `UPDATE ${this.tableName} SET date = ?, client_id = ? WHERE id = ${id};`,
      [data.date, data.client_id]
    );

    if (!results.affectedRows) throw new Error("Error during order update");

    const order = await this.findById(id);

    return order as OrderInterface;
  }

  async delete(id: number): Promise<{ id: number }> {
    const [results] = await db.query<ResultSetHeader>(
      `DELETE FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results.affectedRows) throw new Error("Error during order delete");

    return { id };
  }

  async findById(id: number): Promise<OrderInterface | null> {
    const [results] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results[0]) return null;

    const order = results[0] as OrderInterface;

    return order;
  }
}

export default new OrderRepository();
