import { Then } from '@cucumber/cucumber';
import { testState } from '../support/testState';

Then('the activities should be sorted by descending score', function() {
  const scores = testState.lastResponse.activities.map((activity) => activity.score);
  const sortedScores = [...scores].sort((a, b) => b - a);

  if (JSON.stringify(scores) !== JSON.stringify(sortedScores)) {
    throw new Error('Activities are not sorted by descending score');
  }
});

Then('every activity score should be between {int} and {int}', function(min: number, max: number) {
  const invalidScores = testState.lastResponse.activities.filter((activity) => activity.score < min || activity.score > max);

  if (invalidScores.length > 0) {
    throw new Error('Activity scores are outside the allowed range');
  }
});

Then('both responses should be identical', function() {
  if (testState.responseHistory.length < 2) {
    throw new Error('Two responses were not captured');
  }

  const [first, second] = testState.responseHistory;
  if (JSON.stringify(first) !== JSON.stringify(second)) {
    throw new Error('Responses were not identical');
  }
});
