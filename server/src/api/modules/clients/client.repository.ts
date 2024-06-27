import db from "../../../config/connect.mysql";
import { BaseRepositoryInterface } from "../../../utils/interfaces";
import { ClientInterface } from "./client.model";
import { ResultSetHeader } from "mysql2";

export interface ClientRepositoryInterface
  extends BaseRepositoryInterface<ClientInterface> {}

class ClientRepository implements ClientRepositoryInterface {
  private tableName = "clients";

  async index(): Promise<ClientInterface[]> {
    const [results] = await db.query(`SELECT * FROM ${this.tableName}`, []);

    const clients = results as ClientInterface[];

    return clients;
  }

  async create(data: ClientInterface): Promise<ClientInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `INSERT INTO ${this.tableName} (name, email) VALUES (?, ?)`,
      [data.name, data.email]
    );

    const clientId = results.insertId;

    if (!clientId) throw new Error("Error during client creation");

    const client = await this.findById(clientId);

    return client as ClientInterface;
  }

  async update(id: number, data: ClientInterface): Promise<ClientInterface> {
    const [results] = await db.query<ResultSetHeader>(
      `UPDATE ${this.tableName} SET name = ?, email = ? WHERE id = ${id};`,
      [data.name, data.email]
    );

    if (!results.affectedRows) throw new Error("Error during client update");

    const client = await this.findById(id);

    return client as ClientInterface;
  }

  async delete(id: number): Promise<{ id: number }> {
    const [results] = await db.query<ResultSetHeader>(
      `DELETE FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results.affectedRows) throw new Error("Error during client delete");

    return { id };
  }

  async findById(id: number): Promise<ClientInterface | null> {
    const [results] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ${id}`
    );

    if (!results[0]) return null;

    const clients = results[0] as ClientInterface;

    return clients;
  }
}

export default new ClientRepository();
