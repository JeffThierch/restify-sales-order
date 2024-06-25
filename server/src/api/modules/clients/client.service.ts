import ClientRepository, {
  ClientRepositoryInterface,
} from "./client.repository";

export interface ClientServiceInterface {
  index(): Promise<any[]>;
  create(): Promise<any>;
  update(): Promise<any>;
  delete(): Promise<any>;
}

class ClientService implements ClientServiceInterface {
  constructor(private clientRepository: ClientRepositoryInterface) {}

  async index(): Promise<any[]> {
    const clients = await this.clientRepository.index();

    return clients;
  }

  async create(): Promise<any> {
    const client = await this.clientRepository.create();

    return client;
  }

  async update(): Promise<any> {
    const client = await this.clientRepository.update();

    return client;
  }

  async delete(): Promise<any> {
    const client = await this.clientRepository.delete();

    return client;
  }
}

export default new ClientService(ClientRepository);
