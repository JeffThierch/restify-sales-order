import { Server } from "restify";
import ProductController from "./product.controller";
import restifyAsyncWrap from "@gilbertco/restify-async-wrap";

const productRoutes = (server: Server) => {
  server.post("/products", restifyAsyncWrap(ProductController.create));
  server.get("/products", restifyAsyncWrap(ProductController.index));
  server.put("/products/:id", restifyAsyncWrap(ProductController.update));
  server.del("/products/:id", restifyAsyncWrap(ProductController.delete));
};

export default productRoutes;
