<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1xEQtxwFxQEssT4Ov37ci4Cegyg5nd7va

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Setup Local Testing Environment

This project uses Vitest and React Testing Library for unit and component testing.

1.  **Install Testing Dependencies:**
    Make sure you have installed the project's development dependencies:
    ```bash
    npm install
    ```
    This will install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.

2.  **Run Tests:**
    To execute the tests, use the following command:
    ```bash
    npm test
    ```
    Vitest will run all files ending with `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` within your project.
