# AutoSenseAI

AutoSenseAI is an advanced mobile application designed to provide AI-powered diagnostics for vehicles. Leveraging Google's Gemini 3.0 model, it offers intelligent analysis through sound, image, and text inputs to help users identify and understand potential vehicle issues.

## Features

- **AI Diagnostics**: Diagnose vehicle problems by analyzing engine sounds, visual damage (photos), or user-described symptoms.
- **Glassmorphic Design**: A premium, modern user interface featuring glassmorphism, smooth animations, and a polished dark mode.
- **Chat Assistant**: Interactive AI assistant to answer vehicle-related questions and provide maintenance advice.
- **Result History**: Save and track past diagnostic results for future reference.

## Tech Stack

- **Frontend**: React Native with Expo
- **AI Model**: Google Gemini 3.0 (via `@google/generative-ai`)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Icons**: Lucide React Native
- **Styling**: Custom Glassmorphic Design System

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Expo Go app installed on your physical device (iOS/Android), or an emulator set up.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Kishara0/AutosenseAI.git
    cd AutosenseAI
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    - Ensure you have your Gemini API key ready.
    - Check `src/constants/config.js` or `.env` (if applicable) to configure your API keys.

### Running the App

Start the development server:

```bash
npm start
```

- Press `a` to open in Android Emulator.
- Press `i` to open in iOS Simulator.
- Press `w` to open in Web Browser.
- Scan the QR code with your phone (using Expo Go) to run on a physical device.

## License

This project is licensed under the MIT License.
