import { Given, When, Then } from '@cucumber/cucumber';
import { SearchPage } from '../pages/SearchPage';

const searchPage = new SearchPage();

Given('cities exist', function() {
  searchPage.createCities();
});

When('I search for {string}', async function(q: string) {
  await searchPage.searchFor(q);
});

Then('matching cities are returned', function() {
  if (searchPage.getResults().length === 0) {
    throw new Error(`No cities matched query "${searchPage.getResults().length === 0 ? '' : searchPage.getResults()}"`);
  }
});
