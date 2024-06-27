import db from "../../../config/connect.mysql";

import { BaseRepositoryInterface } from "@/utils/interfaces";
import { ProductInterface } from "./product.model";
import { ResultSetHeader } from "mysql2";

export interface ProductRepositoryInterface
  extends BaseRepositoryInterface<ProductInterface> {}

class ProductRepository implements ProductRepositoryInterface {
  private tableName = "products";

  async index(): Promise<ProductInterface[]> {
    const [results] = await db.query(`SELECT * FROM ${this.tableName}`, []);

    const products = results as ProductInterface[];

    return products;
  }

  async create(data: ProductInterface): Promise<ProductInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `INSERT INTO ${this.tableName} (name, price) VALUES (?, ?)`,
      [data.name, data.price]
    );

    const productId = results.insertId;

    if (!productId) throw new Error("Error during product creation");

    const product = await this.findById(productId);

    return product as ProductInterface;
  }

  async update(id: number, data: ProductInterface): Promise<ProductInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `UPDATE ${this.tableName} SET name = ?, price = ? WHERE id = ${id};`,
      [data.name, data.price]
    );

    if (!results.affectedRows) throw new Error("Error during product update");

    const product = await this.findById(id);

    return product as ProductInterface;
  }

  async delete(id: number): Promise<{ id: number }> {
    const [results] = await db.query<ResultSetHeader>(
      `DELETE FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results.affectedRows) throw new Error("Error during product delete");

    return { id };
  }

  async findById(id: number): Promise<ProductInterface | null> {
    const [results] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results[0]) return null;

    const product = results[0] as ProductInterface;

    return product;
  }
}

export default new ProductRepository();
