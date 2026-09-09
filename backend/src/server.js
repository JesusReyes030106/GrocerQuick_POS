import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const server = http.createServer((req, res) => {
  console.log(req.url);

  // valida la ruta que se ingreso (home / invalida)
  const file = (req.url === "/" || req.url === "/home") ? "/index.html" : req.url;
  const filePath = path.join(__dirname, "../../frontend", file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain" });
      return res.end("Not Found");
    }

    // Validar tipo de archivo
    if (file.endsWith(".html")) res.writeHead(200, { "content-type": "text/html" });
    else if (file.endsWith(".css")) res.writeHead(200, { "content-type": "text/css" });
    else if (file.endsWith(".jpg")) res.writeHead(200, { "content-type": "image/jpeg" });
    else res.writeHead(200);

    res.end(data);
  });
});

server.listen(3000, () => console.log("server running on port: 3000"));