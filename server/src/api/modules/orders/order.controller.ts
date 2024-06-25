import { Next, Request, Response } from "restify";
import { StatusCodes } from "http-status-codes";
import OrderService, { OrderServiceInterface } from "./order.service";
import OrderModel from "./order.model";

class OrderController {
  constructor(private orderService: OrderServiceInterface) {}

  async index(req: Request, res: Response, next: Next) {
    const clients = await OrderService.index();

    res.send(StatusCodes.OK, clients);
    return next();
  }

  async create(req: Request, res: Response, next: Next) {
    const client = await OrderService.create(new OrderModel(req.body));

    res.send(StatusCodes.CREATED, client);
    return next();
  }

  async update(req: Request, res: Response, next: Next) {
    const client = await OrderService.update(
      req.params.id,
      new OrderModel(req.body)
    );

    res.send(StatusCodes.OK, client);
    return next();
  }

  async delete(req: Request, res: Response, next: Next) {
    const client = await OrderService.delete(req.params.id);

    res.send(StatusCodes.OK, client);
    return next();
  }
}

export default new OrderController(OrderService);
