import { Server } from "restify";
import OrderProductController from "./order-product.controller";
import restifyAsyncWrap from "@gilbertco/restify-async-wrap";

const orderProductRoutes = (server: Server) => {
  server.post(
    "/order-product",
    restifyAsyncWrap(OrderProductController.create)
  );
  server.get("/order-product", restifyAsyncWrap(OrderProductController.index));
  server.put(
    "/order-product/:id",
    restifyAsyncWrap(OrderProductController.update)
  );
  server.del(
    "/order-product/:id",
    restifyAsyncWrap(OrderProductController.delete)
  );
};

export default orderProductRoutes;
