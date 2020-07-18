import http from "http";
import app, { config } from "../app";

const port = config.server.port;
app.disable("x-powered-by");
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", (error: Error) => {
  throw error;
});
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? `pipe ${addr}`
    : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
});
