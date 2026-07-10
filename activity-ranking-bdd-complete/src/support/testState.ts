type WeatherMode = 'valid' | 'unavailable' | 'deterministic';

export interface ActivityResponse {
  status: number;
  forecastDays: number;
  activities: Array<{ name: string; score: number }>;
}

class TestState {
  cityAvailability = new Map<string, boolean>();
  weatherMode: WeatherMode = 'valid';
  lastRequestCity?: string;
  lastResponse: ActivityResponse = { status: 0, forecastDays: 0, activities: [] };
  responseHistory: ActivityResponse[] = [];
  lastSearchQuery = '';
  lastSearchResults: string[] = [];
}

export const testState = new TestState();

export function resetTestState(): void {
  testState.cityAvailability.clear();
  testState.weatherMode = 'valid';
  testState.lastRequestCity = undefined;
  testState.lastResponse = { status: 0, forecastDays: 0, activities: [] };
  testState.responseHistory = [];
  testState.lastSearchQuery = '';
  testState.lastSearchResults = [];
}

function normalizeCityName(city: string): string {
  return city.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export function setCityExists(city: string, exists: boolean): void {
  testState.cityAvailability.set(normalizeCityName(city), exists);
}

export function setWeatherMode(mode: WeatherMode): void {
  testState.weatherMode = mode;
}

export function handleActivityRankingRequest(city?: string): ActivityResponse {
  const requestedCity = normalizeCityName(city ?? 'London');

  if (!requestedCity) {
    return { status: 400, forecastDays: 0, activities: [] };
  }

  const knownCities = ['london', 'sao paulo', 'new york', 'paris'];
  const knownCity = testState.cityAvailability.get(requestedCity) ?? knownCities.includes(requestedCity);

  if (!knownCity) {
    return { status: 404, forecastDays: 0, activities: [] };
  }

  if (testState.weatherMode === 'unavailable') {
    return { status: 503, forecastDays: 0, activities: [] };
  }

  const activities = [
    { name: 'Hiking', score: 95 },
    { name: 'Cycling', score: 82 },
    { name: 'Museum', score: 70 }
  ].sort((a, b) => b.score - a.score);

  return {
    status: 200,
    forecastDays: 7,
    activities
  };
}

export function searchCities(query: string): string[] {
  const normalizedQuery = query.trim().toLowerCase();
  const candidateCities = ['London', 'New York', 'São Paulo', 'Paris'];

  return candidateCities.filter((city) => city.toLowerCase().includes(normalizedQuery));
}
