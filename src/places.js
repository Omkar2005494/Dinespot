const curatedPlaces = {
  cafe: [
    {
      name: "Third Wave Coffee Roasters",
      area: "Indiranagar",
      destination: "100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Matteo Coffea",
      area: "Church Street",
      destination: "Church Street, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "The Hole in the Wall Cafe",
      area: "Koramangala",
      destination: "4th Block, Koramangala, Bengaluru, Karnataka 560034",
      source: "Curated Bangalore dataset",
    },
    {
      name: "DYU Art Cafe",
      area: "Indiranagar",
      destination: "Old Airport Rd, Indiranagar, Bengaluru, Karnataka 560038",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Cafe Azzure",
      area: "Koramangala",
      destination: "6th Block, Koramangala, Bengaluru, Karnataka 560095",
      source: "Curated Bangalore dataset",
    },
  ],
  restaurant: [
    {
      name: "Truffles",
      area: "Church Street",
      destination: "Church Street, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Meghana Foods",
      area: "Koramangala",
      destination: "5th Block, Koramangala, Bengaluru, Karnataka 560095",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Nagarjuna",
      area: "Residency Road",
      destination: "Residency Road, Bengaluru, Karnataka 560025",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Koshy's",
      area: "St. Mark's Road",
      destination: "St. Mark's Road, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Rameshwaram Cafe",
      area: "Indiranagar",
      destination: "Indiranagar, Bengaluru, Karnataka 560038",
      source: "Curated Bangalore dataset",
    },
  ],
  gym: [
    {
      name: "Cult Fitness",
      area: "Indiranagar",
      destination: "Indiranagar, Bengaluru, Karnataka 560038",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Gold's Gym",
      area: "Koramangala",
      destination: "Koramangala, Bengaluru, Karnataka 560095",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Snap Fitness",
      area: "Jayanagar",
      destination: "Jayanagar, Bengaluru, Karnataka 560011",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Talwalkars",
      area: "MG Road",
      destination: "MG Road, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Anytime Fitness",
      area: "Whitefield",
      destination: "Whitefield, Bengaluru, Karnataka 560066",
      source: "Curated Bangalore dataset",
    },
  ],
  park: [
    {
      name: "Cubbon Park",
      area: "Central Bangalore",
      destination: "Cubbon Park, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Lalbagh Botanical Garden",
      area: "Basavanagudi",
      destination: "Lalbagh Road, Bengaluru, Karnataka 560004",
      source: "Curated Bangalore dataset",
    },
    {
      name: "JP Park",
      area: "Mathikere",
      destination: "JP Park, Bengaluru, Karnataka 560054",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Ulsoor Lake",
      area: "Ulsoor",
      destination: "Ulsoor, Bengaluru, Karnataka 560008",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Nandi Hills",
      area: "Chikkaballapur",
      destination: "Nandi Hills, Karnataka 562103",
      source: "Curated Bangalore dataset",
    },
  ],
  mall: [
    {
      name: "UB City",
      area: "Vittal Mallya Road",
      destination: "Vittal Mallya Road, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Orion Mall",
      area: "Rajajinagar",
      destination: "Dr Rajkumar Rd, Rajajinagar, Bengaluru, Karnataka 560055",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Phoenix Marketcity",
      area: "Whitefield",
      destination: "Whitefield Main Road, Bengaluru, Karnataka 560048",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Forum Mall",
      area: "Koramangala",
      destination: "Koramangala, Bengaluru, Karnataka 560095",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Phoenix Mall of Asia",
      area: "Hebbal",
      destination: "Bellary Rd, Hebbal, Bengaluru, Karnataka 560092",
      source: "Curated Bangalore dataset",
    },
  ],
  museum: [
    {
      name: "Visvesvaraya Industrial and Technological Museum",
      area: "Cubbon Road",
      destination: "Cubbon Rd, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "National Gallery of Modern Art",
      area: "Vasanth Nagar",
      destination: "Palace Road, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "HAL Heritage Centre and Aerospace Museum",
      area: "Old Airport Road",
      destination: "Old Airport Rd, Bengaluru, Karnataka 560017",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Jawaharlal Nehru Planetarium",
      area: "High Grounds",
      destination: "High Grounds, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
    {
      name: "Government Museum",
      area: "Kasturba Road",
      destination: "Kasturba Road, Bengaluru, Karnataka 560001",
      source: "Curated Bangalore dataset",
    },
  ],
};

const categoryAliases = {
  cafe: "cafe",
  cafes: "cafe",
  coffee: "cafe",
  restaurant: "restaurant",
  restaurants: "restaurant",
  food: "restaurant",
  lunch: "restaurant",
  dinner: "restaurant",
  gym: "gym",
  gyms: "gym",
  fitness: "gym",
  workout: "gym",
  training: "gym",
  park: "park",
  parks: "park",
  garden: "park",
  gardens: "park",
  mall: "mall",
  malls: "mall",
  shopping: "mall",
  museum: "museum",
  museums: "museum",
  heritage: "museum",
};

const defaultCategory = "cafe";

export function normalizeCategory(category) {
  return curatedPlaces[category] ? category : defaultCategory;
}

export function inferCategoryFromText(text) {
  const lowerText = text.toLowerCase();

  for (const [keyword, category] of Object.entries(categoryAliases)) {
    if (lowerText.includes(keyword)) {
      return category;
    }
  }

  return defaultCategory;
}

export function getCuratedPlaces(category) {
  return curatedPlaces[normalizeCategory(category)] ?? curatedPlaces[defaultCategory];
}

export function formatDestination(place) {
  if (place.destination) {
    return place.destination;
  }

  if (place.latitude !== undefined && place.longitude !== undefined) {
    return `${place.latitude},${place.longitude}`;
  }

  return `${place.name}, Bengaluru, Karnataka, India`;
}
