import { Next, Request, Response } from "restify";
import { StatusCodes } from "http-status-codes";
import ProductService, { ProductServiceInterface } from "./product.service";

class ProductController {
  constructor(private productService: ProductServiceInterface) {}

  async index(req: Request, res: Response, next: Next) {
    const clients = await ProductService.index();

    res.send(StatusCodes.OK, clients);
    return next();
  }
  async create(req: Request, res: Response, next: Next) {
    const client = await ProductService.create();

    res.send(StatusCodes.CREATED, client);
    return next();
  }
  async update(req: Request, res: Response, next: Next) {
    const client = await ProductService.update();

    res.send(StatusCodes.OK, client);
    return next();
  }
  async delete(req: Request, res: Response, next: Next) {
    const client = await ProductService.delete();

    res.send(StatusCodes.OK, client);
    return next();
  }
}

export default new ProductController(ProductService);
