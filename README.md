# Location Intelligence AI Agent — Bangalore

An interactive, intelligent agent that helps users make smart location-based decisions for Bangalore. Ask it about the best cafes, gyms, parks, or even where to locate a new business! Powered by Google BigQuery (for business/location data) and Google Maps APIs (Places & Distance Matrix), it responds with recommendations—not just search results.


- Understands free-form queries (e.g., "gyms in Whitefield")
- Finds top places using Google Places, BigQuery, and curated data
- Calculates distance and travel time using the Distance Matrix API
- Gives recommendations with reasoning, not just a list
- Suggests business opportunities based on competition analysis

## Demo Example

**Query:** `best cafes in Indiranagar`

**Response:**

```
Top cafes in Indiranagar:

1. Third Wave Coffee – 0.5 km (3 mins)
2. Starbucks – 1.1 km (5 mins)
3. DYU Art Cafe – 2.0 km (8 mins)

Why:
These cafes are located in high-footfall, accessible areas. 
For a new cafe, consider slightly less saturated nearby regions 
to reduce competition.
```

## Features

- ✅ Understands free-form natural language queries
- ✅ Multi-source data fetching with intelligent fallbacks
- ✅ Real-time distance and travel time calculations
- ✅ Ranking by proximity and accessibility
- ✅ Business opportunity analysis based on competition
- ✅ Works offline with curated Bangalore dataset

## How It Works

The agent follows a simple pipeline:

1. **Parse Query** – Extract category, area, and intent (recommend, compare, find)
2. **Fetch Data** – Try Google Places API → BigQuery → Curated fallback
3. **Calculate Distance** – Use Google Maps Distance Matrix API
4. **Analyze & Recommend** – Rank results, provide reasoning, highlight opportunities
## Prerequisites

- Node.js v16 or higher
- Google Cloud Platform project
- Google Cloud credits (provided by the workshop)
- API keys for:
  - Google Maps (Places & Distance Matrix)
  - Google BigQuery (optional, for custom data)

## Setup Guide

### Step 1: Clone and Install

```bash
git clone <your-repo>
cd location
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
PROJECT_ID=your-gcloud-project
DATASET=your_bigquery_dataset
TABLE=your_places_table
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Step 3: Enable Google Cloud APIs

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select your project
3. Enable the following APIs:
   - **BigQuery API**
   - **Places API**
   - **Distance Matrix API**
4. Generate an API key and add it to `.env`

### Step 4: Configure BigQuery (Optional)

If you want to use custom data in BigQuery:

1. Create a dataset in your project
2. Create a table with this schema:

```sql
CREATE TABLE `your_project.dataset.table` (
  name STRING,
  category STRING,
  latitude FLOAT64,
  longitude FLOAT64
);
```

3. Insert sample place data as needed
4. Ensure your user/service account has read permissions

### Step 5: Run the Agent

```bash
npm start
```
## APIs Used

### Google Places Text Search API

Search for places by category and area.

- **Docs:** [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- **Use case:** Finding cafes, gyms, restaurants, parks, museums, etc. in a given area

### Google Distance Matrix API

Calculate real-world distance and travel time between two locations.

- **Docs:** [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/start)
- **Use case:** Ranking results by proximity to a given area

### Google BigQuery

Store and query custom place/business data at scale.

- **Docs:** [Google BigQuery](https://cloud.google.com/bigquery)
- **Use case:** Custom datasets with specialized location data

### Curated Fallback Dataset

Local Bangalore dataset included in the project for workshop reliability.

- **Use case:** Works when external APIs fail or are not configured
## Fallback Strategy

The agent uses a multi-tier fallback strategy to ensure reliability:

1. **Primary:** Google Places API + Distance Matrix
2. **Secondary:** BigQuery custom data
3. **Tertiary:** Curated Bangalore dataset

This means you'll always get results, even if external APIs are unavailable during the workshop.
## Example Queries

Try these queries:

```
Top gyms in Koramangala
Restaurants in Whitefield
Should I open a cafe near MG Road?
Best parks in Bangalore
Museums in Cubbon Road
```
## Supported Categories

- Cafes
- Restaurants
- Gyms
- Parks
- Malls
- Museums

## Troubleshooting

### API Key Issues

- Double-check that the API key is in `.env`
- Verify that Places API and Distance Matrix API are enabled
- Check that billing is enabled on the Google Cloud project

### BigQuery Permissions

- Make sure the service account or user can read the table
- Verify `PROJECT_ID`, `DATASET`, and `TABLE` are correct in `.env`
- Check that the table has `name`, `category`, `latitude`, and `longitude` columns

### No Results Returned

- Try a query with a specific Bangalore area
- Verify that the category is in the supported list
- Check that the Google Maps API key is valid and not rate-limited
## Project Structure

```
├── index.js          # CLI entry point
├── agent.js          # Orchestration logic
├── tools.js          # API integrations
├── places.js         # Curated data & helpers
├── package.json      # Dependencies
└── README.md         # This file
```

## Future Improvements

- Add user location (dynamic origin)
- Visualize results on a map UI
- Use advanced AI models for reasoning
- Support more place categories
- Add reviews and ratings integration

## License

MIT
