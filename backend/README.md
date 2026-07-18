# ScholarAI Backend API

This is the backend server for ScholarAI, built with **Express**, **TypeScript**, and **Zod**. It processes student profiles, filters matching scholarships from a catalog, and evaluates them with **Gemini AI** for qualitative compatibility.

## Features

1. **Input Validation**: Uses **Zod** to validate, parse, and verify incoming student profile payloads at runtime.
2. **Rules-Based Filtering**: Fast, local rules engine matching student parameters (state, gender, course level, income, marks, category, disability status) against scholarship criteria.
3. **Gemini AI Evaluator**: Utilizes the modern `@google/genai` SDK to evaluate student `specialNotes` against scholarship `specialConditions` (e.g., checking if parent is a farmer, first-generation graduate, regional background, or facing a family crisis) to score (0-100) and generate custom match justifications.
4. **Graceful Fallback**: Automatically falls back to rules-based evaluations if the Gemini API key is missing or calls fail.

---

## Directory Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── scholarship.controller.ts   # Main orchestration controller
│   ├── data/
│   │   └── scholarships.json          # Scholarship database (mock catalog)
│   ├── models/
│   │   ├── scholarship.ts             # Scholarship type interface
│   │   └── student.ts                 # Student Profile type interface
│   ├── routes/
│   │   └── scholarship.routes.ts      # Router mappings (routes)
│   ├── services/
│   │   ├── ai.service.ts              # Gemini AI client and scoring prompt
│   │   ├── filter.service.ts          # Rules matching engine
│   │   └── scholarship.service.ts     # JSON data reader
│   ├── validation/
│   │   └── student.validation.ts      # Zod validation schemas
│   ├── app.ts                         # Express app middleware setup
│   └── server.ts                      # Server startup entrypoint
├── .env                               # Local secrets (ignored)
├── .env.example                       # Environment template
├── tsconfig.json                      # TS compiler configurations
└── package.json                       # Dependencies & build scripts
```

---

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your configuration:
* `PORT`: Server port (default is `5000`).
* `GEMINI_API_KEY`: Get a free key from [Google AI Studio](https://aistudio.google.com/).

### 3. Install Dependencies
```bash
npm install
```

### 4. Build and Run Server
* **Build TypeScript Code**:
  ```bash
  npm run build
  ```
* **Run in Development**:
  ```bash
  npm run dev
  ```
* **Start Compiled Server**:
  ```bash
  npm start
  ```

The server will listen at `http://localhost:5000`.

---

## API Endpoints

### `POST /api/match`

Generates ranked scholarship recommendations for a student profile.

#### Request Body
```json
{
  "fullName": "Aisha Sharma",
  "state": "Tamil Nadu",
  "gender": "Female",
  "category": "General",
  "courseLevel": "UG",
  "courseType": "Engineering",
  "courseName": "B.E. Computer Science",
  "institution": "Anna University",
  "marksPercentage": 88,
  "annualIncome": 300000,
  "disabilityStatus": false,
  "specialNotes": "I am the first graduate in my family. My parent is a farmer."
}
```

#### Successful Response (`200 OK`)
```json
{
  "success": true,
  "totalMatches": 1,
  "matches": [
    {
      "id": "SCH005",
      "displayName": "TN First Graduate",
      "name": "Tamil Nadu First Graduate Scholarship",
      "provider": "Directorate of Technical Education",
      "providerType": "State Government",
      "description": "Tuition fee waiver for students who are the first in their immediate family to clear professional undergraduate graduation courses.",
      "benefit": {
        "amount": 25000,
        "currency": "INR",
        "frequency": "Yearly"
      },
      "deadline": {
        "type": "EventDriven",
        "month": "August",
        "day": 15
      },
      "eligibility": {
        "categories": ["General", "SC", "ST", "OBC", "EWS", "Minority"],
        "states": ["Tamil Nadu"],
        "gender": ["ALL"],
        "courseLevels": ["UG"],
        "courseTypes": ["Engineering", "Medical"],
        "maxIncome": null,
        "minMarks": null,
        "disability": false,
        "specialConditions": "No other immediate family members should be graduates. Must obtain seat clearance through single-window structural counseling channels."
      },
      "matchScore": 95,
      "matchExplanation": "Since you are from Tamil Nadu and study Engineering, you match the primary criteria. Your special note about being the first graduate is a strong fit for this fee waiver."
    }
  ]
}
```
