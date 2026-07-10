import { Given, When, Then } from '@cucumber/cucumber';
import { ActivityRankingPage } from '../pages/ActivityRankingPage';
import { testState } from '../support/testState';

const activityRankingPage = new ActivityRankingPage();

Given('the city {string} exists', async function(city: string) {
  await activityRankingPage.setCityExists(city);
});

Given('the city {string} does not exist', async function(city: string) {
  await activityRankingPage.setCityDoesNotExist(city);
});

Given('Open-Meteo returns a 7 day forecast', async function() {
  await activityRankingPage.openMeteoReturns7DayForecast();
});

Given('Open-Meteo returns valid weather', async function() {
  await activityRankingPage.openMeteoReturnsValidWeather();
});

Given('Open-Meteo is unavailable', async function() {
  await activityRankingPage.openMeteoIsUnavailable();
});

Given('Open-Meteo returns a deterministic forecast', async function() {
  await activityRankingPage.openMeteoReturnsDeterministicForecast();
});

When('I request activity rankings', async function() {
  await activityRankingPage.requestActivityRankings();
});

When('I request activity rankings for {string}', async function(city: string) {
  await activityRankingPage.requestActivityRankings(city);
});

When('I request activity rankings twice', async function() {
  await activityRankingPage.requestActivityRankingsTwice();
});

Then('the response status should be {int}', async function(code: number) {
  if (testState.lastResponse.status !== code) {
    throw new Error(`Expected status ${code} but received ${testState.lastResponse.status}`);
  }
});

Then('the response should contain {int} forecast days', async function(days: number) {
  if (testState.lastResponse.forecastDays !== days) {
    throw new Error(`Expected ${days} forecast days but received ${testState.lastResponse.forecastDays}`);
  }
});
