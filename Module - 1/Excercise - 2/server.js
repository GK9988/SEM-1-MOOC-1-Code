import http from "http";
import fs, { exists } from "fs";
import path from "path";

const hostName = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + "by method" + req.method);

  if (req.method === "GET") {
    var fileUrl;
    if (req.url === "/") {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }
    console.log(fileUrl);

    var filePath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt === ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            `<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`
          );

          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not a HTML File</h1></body></html>`
      );

      return;
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} is not a supported http method for the web File</h1></body></html>`
    );

    return;
  }
});

server.listen(port, hostName, () => {
  console.log(`The server is live at http://${hostName}:${port}`);
});
