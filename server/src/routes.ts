import { Server } from "restify";
import clientRoutes from "./api/modules/clients/client.routes";
import productRoutes from "./api/modules/products/product.routes";
import orderRoutes from "./api/modules/orders/order.routes";
import orderItemRoutes from "./api/modules/order-item/order-item.routes";

export default function routes(server: Server) {
  clientRoutes(server);
  productRoutes(server);
  orderRoutes(server);
  orderItemRoutes(server);
}
