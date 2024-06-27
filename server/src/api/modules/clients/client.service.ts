import { BaseServiceInterface } from "@/utils/interfaces";
import { ClientInterface } from "./client.model";
import ClientRepository, {
  ClientRepositoryInterface,
} from "./client.repository";

export interface ClientServiceInterface
  extends BaseServiceInterface<ClientInterface> {}

class ClientService implements ClientServiceInterface {
  constructor(private clientRepository: ClientRepositoryInterface) {}

  async index(): Promise<ClientInterface[]> {
    const clients = await this.clientRepository.index();

    return clients;
  }

  async create(data: ClientInterface): Promise<ClientInterface> {
    const newClient = await this.clientRepository.create(data);

    return newClient;
  }

  async update(id: number, data: ClientInterface): Promise<ClientInterface> {
    const client = await this.clientRepository.findById(id);

    if (!client || !client.id) throw new Error("Client not found");

    const updatedClient = await this.clientRepository.update(client.id, data);

    return updatedClient;
  }

  async delete(id): Promise<{ id: number }> {
    const client = await this.clientRepository.findById(id);

    if (!client?.id) throw new Error("Client not found");

    const deleteClient = await this.clientRepository.delete(id);

    return deleteClient;
  }

  async findById(id: number): Promise<ClientInterface | null> {
    const client = await this.clientRepository.findById(id);

    return client;
  }
}

export default new ClientService(ClientRepository);
