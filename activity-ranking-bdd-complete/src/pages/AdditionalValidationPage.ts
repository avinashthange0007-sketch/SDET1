import { ActivityRankingPage } from './ActivityRankingPage';

export class AdditionalValidationPage extends ActivityRankingPage {
  async requestCityRankingsWithCaseInsensitiveLookup(city: string): Promise<void> {
    await this.requestActivityRankings(city);
  }
}
