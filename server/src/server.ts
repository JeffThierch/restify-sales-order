import { createServer, Server, plugins } from "restify";
import { environment } from "./config/environment";
import routes from "./routes";

async function initApp() {
  const app: Server = createServer({
    name: "restify-sales-order",
    version: "1.0.0",
  });

  app.use(plugins.queryParser());
  app.use(plugins.bodyParser());

  routes(app);

  app.listen(environment.SERVER_PORT, () => {
    console.info(
      `O servidor esta rodando na porta: HTTP - ${environment.SERVER_PORT}`
    );
  });
}

initApp();
