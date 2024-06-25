import { Server } from "restify";
import clientRoutes from "./api/modules/clients/client.routes";
import productRoutes from "./api/modules/products/product.routes";
import orderRoutes from "./api/modules/orders/order.routes";
import orderProductRoutes from "./api/modules/order-product/order-product.routes";

export default function routes(server: Server) {
  clientRoutes(server);
  productRoutes(server);
  orderRoutes(server);
  orderProductRoutes(server);
}
