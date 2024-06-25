import { Next, Request, Response } from "restify";
import { StatusCodes } from "http-status-codes";
import OrderProductService, {
  OrderProductServiceInterface,
} from "./order-product.service";
import OrderProductModel from "./order-product.model";

class OrderItemController {
  constructor(private orderProductService: OrderProductServiceInterface) {}

  async index(req: Request, res: Response, next: Next) {
    const clients = await OrderProductService.index();

    res.send(StatusCodes.OK, clients);
    return next();
  }

  async create(req: Request, res: Response, next: Next) {
    const client = await OrderProductService.create(
      new OrderProductModel(req.body)
    );

    res.send(StatusCodes.CREATED, client);
    return next();
  }

  async update(req: Request, res: Response, next: Next) {
    const client = await OrderProductService.update(
      req.params.id,
      new OrderProductModel(req.body)
    );

    res.send(StatusCodes.OK, client);
    return next();
  }

  async delete(req: Request, res: Response, next: Next) {
    const client = await OrderProductService.delete(req.params.id);

    res.send(StatusCodes.OK, client);
    return next();
  }
}

export default new OrderItemController(OrderProductService);
