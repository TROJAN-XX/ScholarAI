# ScholarAI Frontend Client

This is the frontend dashboard of ScholarAI, built with **React**, **TypeScript**, **Tailwind CSS**, and **React Hook Form**. It collects student profiles through a sleek form and queries the matching API, rendering recommendations with custom compatibility graphs and AI justifications.

## Features

1. **Multi-Section Profile Form**: Divides inputs into logical blocks (Personal, Academic, Financial, and Special Notes) with instant validation handled by **Zod** and **React Hook Form**.
2. **Dynamic UI Styling**: Uses premium gradients and states to represent match compatibility. High match scores (>90%) are styled with emerald highlights, moderate scores with indigo, and others with amber.
3. **ScholarAI AI Match Card**: Highlights custom compatibility insights returned by Gemini AI to show students exactly *why* they qualify.
4. **Environment Configurations**: Automatically pulls connection points from `.env` config variables.

---

## Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI controls (Input, Select, Button, etc.)
│   │   ├── form/               # Profile form sectional sections
│   │   └── results/            # (Placeholder/Cleaned up)
│   ├── constants/              # Select dropdown constants (states, courses, categories)
│   ├── pages/
│   │   ├── Home.tsx            # Home page containing the profile form
│   │   └── Result.tsx          # Matched recommendations dashboard view
│   ├── types/
│   │   └── student.ts          # TypeScript type definitions
│   ├── validation/
│   │   └── studentSchema.ts    # Frontend Zod validation schema
│   ├── App.tsx                 # Core layout and view state manager
│   ├── main.tsx                # React app entry point
│   ├── index.css               # Core CSS and Tailwind imports
│   └── App.css                 # Custom form styling rules
├── public/                     # Static client-side assets
├── .env                        # Local configs (VITE_API_URL settings)
├── .env.example                # Env template file
├── vite.config.ts              # Vite compiler configurations
└── package.json                # Fronted dependencies and start scripts
```

---

## Setup Instructions

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Configure API Endpoint
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running backend (e.g., `http://localhost:5000/api`).

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Client
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 5. Build for Production
```bash
npm run build
```
This compiles the application assets into `./dist` ready for static hosting. Preview the build with `npm run preview`.
