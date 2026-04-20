import express from 'express';
import multer from 'multer';
import { diagnose } from '../controllers/agentControllers.js';

const upload = multer({ storage: multer.memoryStorage() });

const agentRoute = express.Router();

agentRoute.post('/diagnose',upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]),diagnose)

export default agentRoute;