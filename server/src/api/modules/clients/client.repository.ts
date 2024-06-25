import db from "../../../config/connect.mysql";
import { ClientInterface } from "./client.model";

export interface ClientRepositoryInterface {
  index(): Promise<ClientInterface[]>;
  create(data: ClientInterface): Promise<ClientInterface>;
  update(id: number, data: ClientInterface): Promise<ClientInterface>;
  delete(id: number): Promise<ClientInterface>;
}

class ClientRepository implements ClientRepositoryInterface {
  private tableName = "client";

  async index(): Promise<ClientInterface[]> {
    const [results] = await db.query(`SELECT * FROM ${this.tableName}`, []);

    const clients = results as ClientInterface[];

    return clients;
  }

  async create(data: ClientInterface): Promise<ClientInterface> {
    const [results] = await db.query("", []);

    const client = results as ClientInterface;

    return client;
  }

  async update(id: number, data: ClientInterface): Promise<ClientInterface> {
    const [results] = await db.query("", []);

    const client = results as ClientInterface;

    return client;
  }

  async delete(id: number): Promise<ClientInterface> {
    const [results] = await db.query("", []);

    const client = results as ClientInterface;

    return client;
  }
}

export default new ClientRepository();
