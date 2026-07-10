import { ActivityRankingPage } from './ActivityRankingPage';

export class ApiResiliencePage extends ActivityRankingPage {
  async requestInvalidCity(city: string): Promise<void> {
    await this.requestActivityRankings(city);
  }
}
