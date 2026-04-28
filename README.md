# AI Location Agent with Gemini

A Node.js application that fetches location data from multiple APIs (Google Places, BigQuery, Distance Matrix) and uses the Gemini LLM model to provide intelligent location recommendations.

## Architecture

- **Data Sources**: Google Places API, BigQuery, Google Distance Matrix
- **LLM**: Google Gemini API
- **Runtime**: Node.js with async/await

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Account with billing enabled
- Internet connection

---

## Complete Setup Instructions

### PART 1: Create Google Cloud Project

#### Step 1.1: Create a New Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the **project dropdown** at the top (shows "Select a Project")
3. Click **NEW PROJECT**
4. Enter:
   - **Project name**: `location-agent` (or any name)
   - **Organization**: Leave blank (or select your org)
5. Click **CREATE**
6. Wait 1-2 minutes for the project to initialize
7. You should now see your project in the dropdown

#### Step 1.2: Enable Billing

1. In Google Cloud Console, go to **Billing**
2. Click **Link a Billing Account**
3. Select or create a billing account
4. Click **LINK BILLING ACCOUNT**

**Note**: Google Cloud provides free credits. You won't be charged unless you exceed free tier limits.

---

### PART 2: Enable Required APIs

Go to **APIs & Services > Library** in Google Cloud Console. For each API below, search, click it, and press **ENABLE**.

#### Enable Google Places API
1. Search for: **Places API**
2. Click result → **ENABLE**
3. Wait for confirmation

#### Enable Google Distance Matrix API
1. Search for: **Distance Matrix API**
2. Click result → **ENABLE**
3. Wait for confirmation

#### Enable BigQuery API
1. Search for: **BigQuery API**
2. Click result → **ENABLE**
3. Wait for confirmation

---

### PART 3: Create and Configure API Key

#### Step 3.1: Generate API Key

1. Go to **APIs & Services > Credentials** in Google Cloud Console
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. A popup shows your API key — **COPY IT** (looks like `AIza...`)
4. Click **RESTRICT KEY** on the popup

#### Step 3.2: Restrict API Key

1. Under **API restrictions**, select **Restrict key**
2. In the dropdown, select these APIs:
   - Google Places API
   - Distance Matrix API
3. Click **SAVE**

This is your `GOOGLE_MAPS_API_KEY`.

---

### PART 4: Set Up BigQuery

#### Step 4.1: Create a BigQuery Dataset

1. Go to **BigQuery** in Google Cloud Console (left sidebar)
2. Click on your **Project ID** in the left panel
3. Click **+ CREATE DATASET**
4. Fill in:
   - **Dataset ID**: `workshop_data`
   - **Data location**: `asia-south1` (for Bangalore)
   - Leave other settings as default
5. Click **CREATE DATASET**

#### Step 4.2: Create a Table

1. Click on the **workshop_data** dataset
2. Click **+ CREATE TABLE**
3. Fill in:
   - **Table name**: `bangalore_places`
   - Under **Schema**, click **EDIT AS TEXT**
4. Paste this JSON schema:

```json
[
  {"name": "name", "type": "STRING", "mode": "NULLABLE"},
  {"name": "category", "type": "STRING", "mode": "NULLABLE"},
  {"name": "latitude", "type": "FLOAT64", "mode": "NULLABLE"},
  {"name": "longitude", "type": "FLOAT64", "mode": "NULLABLE"},
  {"name": "area", "type": "STRING", "mode": "NULLABLE"}
]
```

5. Click **CREATE TABLE**

#### Step 4.3: Insert Sample Data

1. Go to your **bangalore_places** table
2. Click the **INSERT ROWS** button at the top
3. Paste this data (or click **View data** → **Add row** manually):

**Sample Cafes:**
```
Third Wave Coffee, cafe, 13.0369, 77.6249, Indiranagar
Matteo Coffea, cafe, 13.1853, 77.5957, Church Street
The Hole in the Wall Cafe, cafe, 13.0282, 77.6245, Koramangala
```

**Sample Gyms:**
```
Cult Fitness, gym, 13.0369, 77.6249, Indiranagar
Gold's Gym, gym, 13.0282, 77.6245, Koramangala
Snap Fitness, gym, 13.1720, 77.5939, Jayanagar
```

**Sample Parks:**
```
Cubbon Park, park, 13.1939, 77.5941, Central Bangalore
Lalbagh Botanical Garden, park, 13.2352, 77.5845, Basavanagudi
JP Park, park, 13.0760, 77.5631, Mathikere
```

To insert via UI:
1. In BigQuery console, click **INSERT ROWS**
2. Fill in columns manually for each row

---

### PART 5: Set Up Gemini API

#### Step 5.1: Enable Generative Language API

1. Go to **APIs & Services > Library**
2. Search for: **Generative Language API**
3. Click result → **ENABLE**

#### Step 5.2: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **CREATE API KEY** → **Create new secret key in Google Cloud**
3. **COPY the API key** displayed (starts with `AIza...`)

This is your `GEMINI_API_KEY`.

---

### PART 6: Create `.env` File

Create a file named `.env` in the project root directory:

```env
# Google Cloud Project Configuration
PROJECT_ID=your-project-id-here

# BigQuery
DATASET=workshop_data
TABLE=bangalore_places

# Google Maps APIs
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here

# Gemini LLM
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

**Where to get each value:**
- `PROJECT_ID`: Top-left of Google Cloud Console (after "Google Cloud")
- `GOOGLE_MAPS_API_KEY`: From Step 3.1
- `GEMINI_API_KEY`: From Step 5.2

**Replace `your-...` with your actual values!**

---

### PART 7: Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This installs:
- `axios` — HTTP requests
- `dotenv` — Load `.env` variables
- `@google-cloud/bigquery` — BigQuery client
- `readline-sync` — Interactive CLI

---

### PART 8: Run the Agent

```bash
node index.js
```

You should see:
```
AI Location Agent - Bangalore Workshop Edition
Try: cafes in Indiranagar, gyms in Bangalore, parks in Bangalore, museums, malls
Type "exit" to quit.

Query: 
```

---

## Example Queries

Type any of these at the `Query:` prompt:

```
cafes in Indiranagar
gyms in Bangalore
parks in Whitefield
restaurants in Koramangala
museums
malls in HSR
```

**Expected Output:**
```
Top cafes in Indiranagar:

1. Third Wave Coffee – 0.5 km (3 mins)
2. [Another cafe] – 1.2 km (5 mins)
3. [Another cafe] – 1.8 km (7 mins)

Why:
These cafes are in accessible, high-demand areas...
[Gemini's intelligent analysis]

Note: Indiranagar has several options. Competition is balanced.
```

---

## File Structure

```
.
├── index.js                 # Entry point / CLI
├── src/
│   ├── geminiAgent.js      # Main agent (fetches APIs, calls Gemini)
│   ├── places.js           # Category mappings & utilities
│   ├── agent.js            # Original agent (backup)
│   └── tools.js            # Original tools (backup)
├── .env                     # Environment variables (create this)
├── package.json            # Dependencies
└── README.md               # This file
```

---

## How It Works

```
User Query
    ↓
Parse Category & Area (places.js)
    ↓
Fetch from Google Places API
    ↓ (if empty, fallback to)
Query BigQuery Dataset
    ↓
Call Google Distance Matrix API (for each place)
    ↓
Format Data & Create Prompt
    ↓
Call Gemini API (generate analysis)
    ↓
Display Results to User
```

---

## Troubleshooting

### Error: "GOOGLE_MAPS_API_KEY is required"
- ✅ Check `.env` file exists
- ✅ Verify `GOOGLE_MAPS_API_KEY=...` is filled in
- ✅ Confirm Places API & Distance Matrix API are **ENABLED**
- ✅ Check billing is enabled on your project

### Error: "GEMINI_API_URL and GEMINI_API_KEY are required"
- ✅ Add both to `.env`
- ✅ Verify Generative Language API is **ENABLED**
- ✅ Confirm keys are copied correctly (no extra spaces)

### Error: "ProjectNotFound" from BigQuery
- ✅ Verify `PROJECT_ID` in `.env` matches your project
- ✅ Confirm `DATASET=workshop_data` and `TABLE=bangalore_places` exist
- ✅ Check BigQuery API is **ENABLED**

### Error: "UNAUTHENTICATED" from Gemini
- ✅ Verify `GEMINI_API_KEY` is correct
- ✅ Regenerate key at [Google AI Studio](https://makersuite.google.com/app/apikey)
- ✅ Confirm Generative Language API is **ENABLED**

### No results returned
- ✅ Verify Google Places API is **ENABLED**
- ✅ Try query: `"cafes in Bangalore"` (be specific)
- ✅ Check BigQuery has sample data inserted
- ✅ Check internet connection

---

## API Quota & Costs

| API | Free Tier | Cost |
|-----|-----------|------|
| Google Places | 100 free requests/month | ~$7-17 per 1K requests |
| Distance Matrix | 100 free requests/month | ~$5 per 1K requests |
| BigQuery | 1 TB/month free | ~$6.25 per TB scanned |
| Gemini API | Various free limits | Variable token pricing |

Monitor usage in Google Cloud Console → **Billing**.

---

## Quick Reference

### Common Queries
```bash
node index.js
# At the Query: prompt, try:
cafes in Indiranagar
gyms in Bangalore
parks
restaurants in Whitefield
museums
malls
```

### Stop the Agent
```
Type: exit
```

### Modify Queries
Edit [places.js](src/places.js) to add more categories or aliases.

---

## Environment Variables Reference

| Variable | Example | Required |
|----------|---------|----------|
| `PROJECT_ID` | `location-agent-adk` | ✓ |
| `DATASET` | `workshop_data` | ✓ |
| `TABLE` | `bangalore_places` | ✓ |
| `GOOGLE_MAPS_API_KEY` | `AIza...` | ✓ |
| `GEMINI_API_KEY` | `AIza...` | ✓ |
| `GEMINI_API_URL` | `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent` | ✓ |

---

## License

MIT
