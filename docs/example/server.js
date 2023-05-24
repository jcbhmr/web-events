import "@jcbhmr/web-events";
import { createServer } from "node:http";

const server = createServer((req, res) => {
  const event = new CustomEvent("my-app:request", { detail: { req, res } });
  if (globalThis.dispatchEvent(event)) {
    res.statusCode = 404;
    res.end("Not Found");
  }
});
server.listen(3000);

globalThis.addEventListener("my-app:request", (event) => {
  const { req, res } = event.detail;

  if (req.url === "/") {
    event.preventDefault();
    res.statusCode = 200;
    res.end("Hello world!");
  }
});
