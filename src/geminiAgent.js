import axios from "axios";
import { inferCategoryFromText, normalizeCategory, formatDestination } from "./places.js";
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery({ projectId: process.env.PROJECT_ID });

function extractArea(text) {
  const defaultArea = "Bangalore";
  if (!text) return defaultArea;
  const lc = text.toLowerCase();
  const knownAreas = ["hsr", "whitefield", "indiranagar", "koramangala", "mg road", "jayanagar", "malleshwaram", "rajajinagar", "hebbal", "marathahalli", "sarjapur"];
  for (const a of knownAreas) {
    if (lc.includes(a)) return a;
  }
  return defaultArea;
}

async function fetchPlaces(category, area) {
  // Primary: Google Places Text Search
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY is required");
  const res = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
    params: { query: `${category} in ${area}`, key, region: "in" },
  });
  if (res.data?.results && res.data.results.length > 0) {
    return res.data.results.slice(0, 10).map(place => ({
      name: place.name,
      area: area,
      destination: `${place.geometry.location.lat},${place.geometry.location.lng}`,
      source: "Google Places API",
    }));
  }

  // Secondary: BigQuery dataset
  const query = `
    SELECT name, category, latitude, longitude, area
    FROM \`${process.env.PROJECT_ID}.${process.env.DATASET}.${process.env.TABLE}\`
    WHERE LOWER(category) LIKE CONCAT('%', @category, '%')
    LIMIT 10
  `;
  const [rows] = await bigquery.query({ query, params: { category } });
  return rows.map(row => ({
    name: row.name || "Unnamed",
    area: row.area || area,
    destination: formatDestination(row),
    source: "BigQuery",
  }));
}

async function fetchDistance(origin, destination) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY is required");
  const res = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
    params: { origins: origin, destinations: destination, key },
  });
  const element = res.data?.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK") return { distance: { text: "N/A" }, duration: { text: "N/A" } };
  return element;
}

async function callGemini(prompt) {
  const endpoint = process.env.GEMINI_API_URL;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!endpoint || !apiKey) throw new Error("GEMINI_API_URL and GEMINI_API_KEY are required to call the Gemini model");
  const res = await axios.post(endpoint, { prompt }, { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } });
  if (res.data?.output?.[0]?.content) return res.data.output[0].content;
  if (res.data?.candidates?.[0]?.content) return res.data.candidates[0].content;
  if (typeof res.data === "string") return res.data;
  return JSON.stringify(res.data);
}

export async function runAgent(query) {
  try {
    const inferred = inferCategoryFromText(query);
    const category = normalizeCategory(inferred);
    const area = extractArea(query);

    const places = await fetchPlaces(category, area);
    if (!places || places.length === 0) return "No places returned from Places API or BigQuery.";

    const origin = `${area}, Bengaluru, Karnataka, India`;

    const enriched = await Promise.all(
      places.map(async (p) => {
        const dest = p.destination || formatDestination(p);
        const d = await fetchDistance(origin, dest);
        return {
          name: p.name || p.place_name || "Unnamed",
          area: p.area || area,
          destination: dest,
          distanceText: d.distance?.text || d.distanceText || "N/A",
          durationText: d.duration?.text || d.durationText || "N/A",
        };
      })
    );

    let prompt = `You are a location-research assistant. The user asked: "${query}". Here are the candidate places (name | area | distance | duration):\n`;
    enriched.slice(0, 10).forEach((p, i) => {
      prompt += `${i + 1}. ${p.name} | ${p.area} | ${p.distanceText} | ${p.durationText}\n`;
    });
    prompt += `\nProvide a short ranked recommendation (top 3) and a one-paragraph rationale focused on accessibility, demand, and competition. Be concise.`;

    const llmOutput = await callGemini(prompt);
    return typeof llmOutput === "string" ? llmOutput : JSON.stringify(llmOutput);
  } catch (err) {
    return `Agent failed: ${err.message}`;
  }
}

export default runAgent;
