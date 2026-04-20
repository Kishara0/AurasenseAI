import express from "express";
import cors from "cors";
import "./config/env.js";
import userRouter from "./routes/useRoutes.js";
import agentRoute from "./routes/agentRoutes.js";
import carRoute from "./routes/carRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/agent", agentRoute);
server.use("/api/auth", userRouter);
server.use("/api/car", carRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`AurasenseAI Backend listening on port ${PORT}`);
});
