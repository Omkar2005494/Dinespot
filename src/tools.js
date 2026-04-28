import { BigQuery } from "@google-cloud/bigquery";
import axios from "axios";
import dotenv from "dotenv";
import { formatDestination, getCuratedPlaces, normalizeCategory } from "./places.js";

dotenv.config();

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
});

// Tool 1: Google Places API, BigQuery, Curated Fallback
export async function getPlaces(category, area = "Bangalore") {
  const normalizedCategory = normalizeCategory(category);
  // Prioritize Google Places API
  const apiPlaces = await getPlacesFromAPI(normalizedCategory, area);
  if (apiPlaces && apiPlaces.length > 0) return apiPlaces;

  // Fallback: BigQuery
  const query = `
    SELECT name, category, latitude, longitude
    FROM \`${process.env.PROJECT_ID}.${process.env.DATASET}.${process.env.TABLE}\`
    WHERE LOWER(category) LIKE CONCAT('%', @category, '%')
    LIMIT 10
  `;
  try {
    const [rows] = await bigquery.query({
      query,
      params: { category: normalizedCategory },
    });
    const places = rows
      .map((row) => ({
        name: row.name || "Unnamed place",
        category: row.category || normalizedCategory,
        area: row.area || row.neighborhood || area || "Bangalore",
        destination: formatDestination(row),
        source: "BigQuery",
      }))
      .filter((place) => place.destination);
    if (places.length) return places;
  } catch {
    // Fall through to curated data
  }
  // Fallback: curated
  return getCuratedPlaces(normalizedCategory);
}

// Google Places API fetch
export async function getPlacesFromAPI(category, area = "Bangalore") {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json", {
        params: {
          query: `${category} in ${area}`,
          key: process.env.GOOGLE_MAPS_API_KEY,
          region: "in",
        },
      }
    );
    if (!res.data.results || res.data.results.length === 0) return [];
    // Return consistent object structure
    return res.data.results.slice(0, 10).map(place => ({
      name: place.name,
      category,
      area: area,
      destination: `${place.geometry.location.lat},${place.geometry.location.lng}`,
      source: "Google Places API",
    }));
  } catch {
    return [];
  }
}


// Tool 2: Distance
export async function getDistance(origin, destination) {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          origins: origin,
          destinations: destination,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const element = res.data.rows[0].elements[0];

    if (element.status !== "OK") {
      return { distance: { text: "N/A" }, duration: { text: "N/A" } };
    }

    return element;
  } catch {
    return { distance: { text: "N/A" }, duration: { text: "N/A" } };
  }
}