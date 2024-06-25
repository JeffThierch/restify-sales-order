import { Next, Request, Response } from "restify";
import { StatusCodes } from "http-status-codes";
import OrderItemService, {
  OrderItemServiceInterface,
} from "./order-item.service";

class OrderItemController {
  constructor(private orderItemService: OrderItemServiceInterface) {}

  async index(req: Request, res: Response, next: Next) {
    const clients = await OrderItemService.index();

    res.send(StatusCodes.OK, clients);
    return next();
  }
  async create(req: Request, res: Response, next: Next) {
    const client = await OrderItemService.create();

    res.send(StatusCodes.CREATED, client);
    return next();
  }
  async update(req: Request, res: Response, next: Next) {
    const client = await OrderItemService.update();

    res.send(StatusCodes.OK, client);
    return next();
  }
  async delete(req: Request, res: Response, next: Next) {
    const client = await OrderItemService.delete();

    res.send(StatusCodes.OK, client);
    return next();
  }
}

export default new OrderItemController(OrderItemService);
