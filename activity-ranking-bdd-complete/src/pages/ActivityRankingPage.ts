import { BasePage } from './BasePage';
import { handleActivityRankingRequest, setCityExists, setWeatherMode, testState } from '../support/testState';
import { ActivityRankingLocators } from '../locators/ActivityRankingLocators';

export class ActivityRankingPage extends BasePage {
  static readonly locators = ActivityRankingLocators;

  async setCityExists(city: string): Promise<void> {
    setCityExists(city, true);
  }

  async setCityDoesNotExist(city: string): Promise<void> {
    setCityExists(city, false);
  }

  async openMeteoReturns7DayForecast(): Promise<void> {
    setWeatherMode('valid');
  }

  async openMeteoReturnsValidWeather(): Promise<void> {
    setWeatherMode('valid');
  }

  async openMeteoIsUnavailable(): Promise<void> {
    setWeatherMode('unavailable');
  }

  async openMeteoReturnsDeterministicForecast(): Promise<void> {
    setWeatherMode('deterministic');
  }

  async requestActivityRankings(city?: string): Promise<void> {
    const endpoint = ActivityRankingPage.locators.rankingEndpoint;
    testState.lastRequestCity = city;
    testState.lastResponse = handleActivityRankingRequest(city);
    testState.responseHistory.push({ ...testState.lastResponse });
    // simulated call to endpoint: `${endpoint}?city=${city ?? ''}`
  }

  async requestActivityRankingsTwice(): Promise<void> {
    const first = handleActivityRankingRequest();
    const second = handleActivityRankingRequest();
    testState.responseHistory = [first, second];
    testState.lastResponse = second;
  }
}
