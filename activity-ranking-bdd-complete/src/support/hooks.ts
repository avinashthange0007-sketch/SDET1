import { Before } from '@cucumber/cucumber';
import { resetTestState } from './testState';

Before(() => {
  resetTestState();
});