import { Next, Request, Response } from "restify";
import { StatusCodes } from "http-status-codes";
import ClientService, { ClientServiceInterface } from "./client.service";

class ClientController {
  constructor(public clientService: ClientServiceInterface) {}

  async index(req: Request, res: Response, next: Next) {
    const clients = await ClientService.index();

    res.send(StatusCodes.OK, clients);
    return next();
  }

  async create(req: Request, res: Response, next: Next) {
    const client = await ClientService.create();

    res.send(StatusCodes.CREATED, client);
    return next();
  }

  async update(req: Request, res: Response, next: Next) {
    const client = await ClientService.update();

    res.send(StatusCodes.OK, client);
    return next();
  }

  async delete(req: Request, res: Response, next: Next) {
    const client = await ClientService.delete();

    res.send(StatusCodes.OK, client);
    return next();
  }
}

export default new ClientController(ClientService);
