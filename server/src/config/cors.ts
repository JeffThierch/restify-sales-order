import corsMiddleware from "restify-cors-middleware2";

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"],
  allowCredentialsAllOrigins: true,
});

export default cors;
