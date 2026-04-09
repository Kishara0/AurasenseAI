import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DiagnosticState } from '../types/graph.js';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey as string);

export const brainAgent = async (state: DiagnosticState): Promise<Partial<DiagnosticState>> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const { acoustic, visual, textual } = state.agentSummaries;
    
    let synthesisPrompt = `You are the synthesis engine for a vehicle diagnostic AI. Analyze the following separate modality reports and merge them into a single, cohesive brief. Identify any contradictions or complementary information between what is heard, seen, and described by the user.

`;
    if (acoustic) synthesisPrompt += `Acoustic Summary: ${acoustic}\n`;
    if (visual) synthesisPrompt += `Visual Summary: ${visual}\n`;
    if (textual) synthesisPrompt += `Textual Description: ${textual}\n`;

    const result = await model.generateContent(synthesisPrompt);
    const synthesisText = result.response.text();
    
    // We add this synthesis text back into the history as an internal representation
    // Or we replace the textual context for the chief mechanic. 
    // We will append a hidden mechanics note to the history or state for the chief.
    // For simplicity, let's treat the synthesis as part of the specialized context 
    // that the Chief Mechanic will read.
    
    return { synthesis: synthesisText };
};
