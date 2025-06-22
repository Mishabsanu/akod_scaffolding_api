import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import getConfigs from "./config/config.js";
import mongo_service from "./database/mongo.service.js";
import userRouter from "./routes/user.routes.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
import { fileURLToPath } from "url";
import { dirname } from "path";


const Configs = getConfigs();
mongo_service();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use(express.static(__dirname));

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("working fineeeeeeeeee");
});
const server = http.createServer(app);
const PORT = Configs.server.port;
app.use(express.json());

var corsOptions = {
  origin: Configs.cors.origin,
  optionsSuccessStatus: 200,
  credentials: Configs.cors.credentials,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(`/api/${Configs.server.version}/user`, userRouter);
app.use(`/api/${Configs.server.version}/enquiry`, enquiryRouter);

app.use(globalErrorHandler);

// Error handling for the server
server.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
