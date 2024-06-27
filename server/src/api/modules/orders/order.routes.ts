import { Server } from "restify";
import OrderController from "./order.controller";
import restifyAsyncWrap from "@gilbertco/restify-async-wrap";

const orderRoutes = (server: Server) => {
  server.post("/orders", restifyAsyncWrap(OrderController.create));
  server.get("/orders", restifyAsyncWrap(OrderController.index));
  server.get("/orders/:id", restifyAsyncWrap(OrderController.getById));
  server.put("/orders/:id", restifyAsyncWrap(OrderController.update));
  server.del("/orders/:id", restifyAsyncWrap(OrderController.delete));
};

export default orderRoutes;
