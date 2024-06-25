import { Server } from "restify";
import OrderController from "./order-item.controller";
import restifyAsyncWrap from "@gilbertco/restify-async-wrap";

const orderItemRoutes = (server: Server) => {
  server.post("/orders-item", restifyAsyncWrap(OrderController.create));
  server.get("/orders-item", restifyAsyncWrap(OrderController.index));
  server.put("/orders-item/:id", restifyAsyncWrap(OrderController.update));
  server.del("/orders-item/:id", restifyAsyncWrap(OrderController.delete));
};

export default orderItemRoutes;
