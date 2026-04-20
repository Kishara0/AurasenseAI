import express, { Request, Response } from "express";
import "dotenv/config";
import { app as diagnosticGraph } from "../graph/index.js";

const diagnose = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const history = body.history ? JSON.parse(body.history) : [];
    const text = body.text;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const rawInputs: any = {};
    if (text) rawInputs.text = text;

    const audioFile = files?.["audio"]?.[0];
    if (audioFile) {
      rawInputs.audio = audioFile.buffer.toString("base64");
      rawInputs.audioMimeType = audioFile.mimetype;
    }

    const imageFiles = files?.["images"];
    if (imageFiles?.length) {
      rawInputs.images = imageFiles.map((f) => f.buffer.toString("base64"));
      rawInputs.imageMimeTypes = imageFiles.map((f) => f.mimetype);
    }

    const initialState = {
      rawInputs,
      history,
    };

    const finalState = await diagnosticGraph.invoke(initialState);
    res.json(finalState);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

export { diagnose };
