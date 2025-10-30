import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import configDotenv from "dotenv";
import http from "http";
import { UserManager } from "./managers/userManager";
import { IncomingRequest } from "./types/incomingRequest";
import { CONNECTION } from "./lib/constants";
import notificationRouter from "./routes/notify";

configDotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", notificationRouter);

const wss = new WebSocketServer({ server: server });

const PORT = process.env.PORT || 8080;

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const parsedMessage = JSON.parse(msg.toString()) as IncomingRequest;

    if (parsedMessage.type === CONNECTION) {
      UserManager.getInstance().addUser(ws, parsedMessage.payload.userId);
    }
  });

  ws.on("close", () => {
    UserManager.getInstance().deleteConnection(ws);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
