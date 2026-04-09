import { create } from 'zustand';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export interface DiagnosisResult {
  primary_diagnosis: string;
  confidence: number;
  actions: string[];
  safety_warnings: string[];
}

interface DiagnosisState {
  text: string;
  audioUri: string | null;
  imageUris: string[];
  
  isAnalyzing: boolean;
  finalDiagnosis: DiagnosisResult | null;
  history: any[]; 
  
  setText: (text: string) => void;
  setAudio: (uri: string) => void;
  addImage: (uri: string) => void;
  clearDiagnosis: () => void;
  submitDiagnosis: () => Promise<any>;
}

export const useDiagnosisStore = create<DiagnosisState>((set, get) => ({
  text: '',
  audioUri: null,
  imageUris: [],
  isAnalyzing: false,
  finalDiagnosis: null,
  history: [],
  
  setText: (text) => set({ text }),
  setAudio: (uri) => set({ audioUri: uri }),
  addImage: (uri) => set((state) => ({ imageUris: [...state.imageUris, uri] })),
  
  clearDiagnosis: () => set({
    text: '',
    audioUri: null,
    imageUris: [],
    finalDiagnosis: null,
    history: [],
  }),

  submitDiagnosis: async () => {
    set({ isAnalyzing: true, finalDiagnosis: null });
    try {
      const { text, audioUri, imageUris, history } = get();
      
      const formData = new FormData();
      if (text) {
          formData.append("text", text);
      }
      
      if (history.length > 0) {
          formData.append("history", JSON.stringify(history));
      }
      
      if (audioUri) {
          formData.append("audio", {
              uri: audioUri,
              name: "recording.m4a",
              // We'll trust whatever backend format unless overridden natively
              type: "audio/m4a"
          } as any);
      }
      
      imageUris.forEach((uri, index) => {
          formData.append("images", {
              uri: uri,
              name: `image_${index}.jpg`,
              type: "image/jpeg"
          } as any);
      });

      let backendUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000/diagnose' : 'http://127.0.0.1:3000/diagnose';

      // Use the actual IP of your machine dynamically from Expo if available
      const debuggerHost = Constants.expoConfig?.hostUri;
      if (debuggerHost) {
          const ip = debuggerHost.split(':')[0];
          backendUrl = `http://${ip}:3000/diagnose`;
      }

      const response = await fetch(backendUrl, {
          method: "POST",
          body: formData,
          headers: {
              Accept: 'application/json',
              "Content-Type": "multipart/form-data"
          }
      });

      if (!response.ok) {
          console.error(await response.text());
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.status === 'complete') {
          set({ finalDiagnosis: data.finalDiagnosis, history: data.history || history });
      } else if (data.status === 'awaiting_user') {
          set({ history: data.history });
      }

      return data;

    } catch (e) {
      console.error("Diagnosis Submission Error:", e);
      throw e;
    } finally {
      set({ isAnalyzing: false });
    }
  }
}));
