import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DiagnosticState } from '../types/graph.js';
import { config } from '../config/env.js';
import { base64ToGenerativePart } from '../utils/fileHelpers.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey as string);

export const acousticAgent = async (state: DiagnosticState): Promise<Partial<DiagnosticState>> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // using 1.5-pro as substitute for Gemini 3.0 API naming conventions
  
  const { audio, audioMimeType } = state.rawInputs;
  if (!audio || !audioMimeType) return {};

  const audioPart = base64ToGenerativePart(audio, audioMimeType);
  const prompt = "Analyze this audio of a car. Identify any irregular noises, engine sounds, or signs of mechanical failure. Provide a concise technical summary of what you hear.";

  const result = await model.generateContent([prompt, audioPart]);
  const responseText = result.response.text();

  return { 
    agentSummaries: {
      ...state.agentSummaries,
      acoustic: responseText
    }
  };
};

export const visualAgent = async (state: DiagnosticState): Promise<Partial<DiagnosticState>> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const { images, imageMimeTypes } = state.rawInputs;
    if (!images || !imageMimeTypes || images.length === 0) return {};
  
    const imageParts = images.map((base64, index) => 
        base64ToGenerativePart(base64, imageMimeTypes[index] || "image/jpeg")
    );

    const prompt = "Analyze these images of a vehicle. Look for visual damage, leaks, wear and tear, or disconnected components. Provide a concise technical summary of your findings.";
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
  
    return { 
      agentSummaries: {
        ...state.agentSummaries,
        visual: responseText
      }
    };
};

export const symptomAgent = async (state: DiagnosticState): Promise<Partial<DiagnosticState>> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const { text } = state.rawInputs;
    if (!text) return {};
  
    const prompt = `The driver describes the following car symptoms: "${text}". Analyze these symptoms and provide a concise technical summary of potential mechanical faults.`;
  
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
  
    return { 
      agentSummaries: {
        ...state.agentSummaries,
        textual: responseText
      }
    };
};
