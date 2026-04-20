import express from "express";
import authenticateToken from '../middleware/authMiddleware.js';
import { createVehicle,getVehicle } from "../controllers/carControllers.js";

const carRoute = express.Router();

carRoute.post("/addVehicle",authenticateToken,createVehicle);
carRoute.get("/getVehicles",authenticateToken,getVehicle);

export default carRoute;