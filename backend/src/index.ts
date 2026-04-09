import express from 'express';
import cors from 'cors';
import multer from 'multer';
import './config/env.js'; // Ensure env validation runs
import { app as diagnosticGraph } from './graph/index.js';

const server = express();
server.use(cors());
server.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

server.post('/diagnose', upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]), async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;
        const history = body.history ? JSON.parse(body.history) : [];
        const text = body.text;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        
        const rawInputs: any = {};
        if (text) rawInputs.text = text;
        
        const audioFile = files?.['audio']?.[0];
        if (audioFile) {
            rawInputs.audio = audioFile.buffer.toString('base64');
            rawInputs.audioMimeType = audioFile.mimetype;
        }
        
        const imageFiles = files?.['images'];
        if (imageFiles?.length) {
            rawInputs.images = imageFiles.map(f => f.buffer.toString('base64'));
            rawInputs.imageMimeTypes = imageFiles.map(f => f.mimetype);
        }

        const initialState = {
            rawInputs,
            history
        };

        const finalState = await diagnosticGraph.invoke(initialState);
        res.json(finalState);

    } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`AurasenseAI Backend listening on port ${PORT}`);
});
