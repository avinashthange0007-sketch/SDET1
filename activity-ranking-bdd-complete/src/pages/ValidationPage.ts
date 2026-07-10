import { ActivityRankingPage } from './ActivityRankingPage';

export class ValidationPage extends ActivityRankingPage {
  async requestWithInvalidCity(city: string): Promise<void> {
    await this.requestActivityRankings(city);
  }
}
