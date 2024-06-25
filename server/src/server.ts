import { createServer, Server, plugins } from "restify";
import { environment } from "./config/environment";
import routes from "./routes";
import cors from "./config/cors";

async function initApp() {
  const server: Server = createServer({
    name: "restify-sales-order",
    version: "1.0.0",
  });

  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.pre(cors.preflight);
  server.use(cors.actual);

  routes(server);

  server.listen(environment.SERVER_PORT, () => {
    console.info(
      `O servidor esta rodando na porta: HTTP - ${environment.SERVER_PORT}`
    );
  });
}

initApp();
