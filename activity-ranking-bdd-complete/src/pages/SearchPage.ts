import { BasePage } from './BasePage';
import { searchCities, setCityExists, testState } from '../support/testState';
import { PartialSearchLocators } from '../locators/PartialSearchLocators';

export class SearchPage extends BasePage {
  static readonly locators = PartialSearchLocators;

  createCities(): void {
    setCityExists('London', true);
    setCityExists('New York', true);
    setCityExists('São Paulo', true);
    setCityExists('Paris', true);
  }

  async searchFor(query: string): Promise<void> {
    const endpoint = SearchPage.locators.citySearchEndpoint;
    testState.lastSearchQuery = query;
    testState.lastSearchResults = searchCities(query);
    // simulated call to endpoint: `${endpoint}?${SearchPage.locators.queryParam}=${query}`
  }

  getResults(): string[] {
    return testState.lastSearchResults;
  }
}
