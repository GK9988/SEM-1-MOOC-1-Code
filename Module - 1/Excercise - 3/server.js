// Module Imports
import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dishRouter from "./routes/dishRouter.js";

// Initializations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "localhost";
const port = 3000;

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Routes

// 1. /dishes route
app.use("/dishes", dishRouter);

// 2. /dishes/:dishId route

app.get("/dishes/:dishId", (req, res, next) => {
  res.end(`Will Send you the dish with id: ${req.params.dishId}`);
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write(`Updating the dish: ${req.params.dishId} \n`);
  res.end(
    `Will update the dish: ${req.body.name} with details: ${req.body.description}`
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end(`Deleting the Dish: ${req.params.dishId}`);
});

// Server Config
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
