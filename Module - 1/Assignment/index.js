// Module Imports
import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dishRouter from "./routes/dishRouter.js";
import promoRouter from "./routes/promoRouter.js";
import leaderRouter from "./routes/leaderRouter.js";

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
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// 2.

// Server Config
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
