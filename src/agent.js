import { getPlaces, getDistance } from "./tools.js";
import { inferCategoryFromText, normalizeCategory } from "./places.js";

const BANGALORE_AREAS = [
  "HSR", "Whitefield", "Indiranagar", "Koramangala", "MG Road", "Jayanagar", "Malleshwaram", "Rajajinagar",
  "Hebbal", "Marathahalli", "Sarjapur", "BTM", "Bannerghatta", "Yelahanka", "Bellandur", "Basavanagudi",
  "Ulsoor", "Vasanth Nagar", "Vittal Mallya Road", "Church Street", "Residency Road", "Mathikere", "Chikkaballapur",
  "High Grounds", "Old Airport Road"
];

function extractArea(text) {
  const lc = text.toLowerCase();
  for (const area of BANGALORE_AREAS) {
    if (lc.includes(area.toLowerCase())) return area;
  }
  return "Bangalore";
}

function formatMapsUrl(placeName, area) {
  const query = encodeURIComponent(`${placeName} ${area} Bengaluru`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function resolveCategory(userQuery) {
  return normalizeCategory(inferCategoryFromText(userQuery));
}

export async function runAgent(userQuery) {
  try {
    const category = resolveCategory(userQuery);
    const area = extractArea(userQuery);
    
    const places = await getPlaces(category, area);
    if (!places.length) return "No results found.";
    
    const origin = `${area}, Bengaluru, Karnataka, India`;
    // For distance/time + density analysis, get all
    const distResults = await Promise.all(
      places.map(async place => {
        const distance = await getDistance(origin, place.destination);
        return {
          ...place,
          distanceVal: distance.distance?.value || 9999999,
          timeVal: distance.duration?.value || 9999999,
          distanceText: distance.distance?.text || "N/A",
          durationText: distance.duration?.text || "N/A",
          mapsUrl: formatMapsUrl(place.name, place.area || area),
        };
      })
    );
    // Rank top 3 by proximity (distance)
    const top = distResults.sort((a, b) => a.distanceVal - b.distanceVal).slice(0, 3);
    // Estimate density (competition) by counting # in same area
    const competition = distResults.filter(p => (p.area.toLowerCase() === area.toLowerCase())).length;

    let out = `Top ${category}s in ${area}:
`;
    top.forEach((place, i) => {
      out += `\n${i + 1}. ${place.name} – ${place.distanceText} (${place.durationText})`;
    });
    out += `\n\nWhy:`;
    out += `\nThese ${category}s are in well-connected locales with strong accessibility.\n`;
    out += `They are popular in ${area}, serving both local crowd and office-goers.`;
    if (competition > 4) {
      out += `\n\nNote: ${area} already has several options (${competition}). If opening a new ${category}, consider slightly less saturated nearby areas to reduce competition.`;
    } else if (competition <= 1) {
      out += `\n\nNote: There's an opportunity in ${area} as competition is relatively low.`;
    } else {
      out += `\n\nCompetition is balanced in ${area}.`;
    }
    return out;
  } catch (err) {
    return "Agent failed: " + err.message;
  }
}
