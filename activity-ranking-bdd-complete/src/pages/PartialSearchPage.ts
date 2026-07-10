import { SearchPage } from './SearchPage';

export class PartialSearchPage extends SearchPage {
  async searchForQuery(query: string): Promise<void> {
    await this.searchFor(query);
  }
}
