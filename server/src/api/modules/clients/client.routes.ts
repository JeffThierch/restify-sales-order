import { Server } from "restify";
import ClientController from "./client.controller";
import restifyAsyncWrap from "@gilbertco/restify-async-wrap";

const clientRoutes = (server: Server) => {
  server.post("/clients", restifyAsyncWrap(ClientController.create));
  server.get("/clients", restifyAsyncWrap(ClientController.index));
  server.put("/clients/:id", restifyAsyncWrap(ClientController.update));
  server.del("/clients/:id", restifyAsyncWrap(ClientController.delete));
};

export default clientRoutes;
