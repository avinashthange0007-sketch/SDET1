Feature: Activity Ranking API

Scenario: Get rankings for a valid city
 Given the city "London" exists
 And Open-Meteo returns a 7 day forecast
 When I request activity rankings
 Then the response status should be 200
 And the response should contain 7 forecast days

Scenario: Get rankings for a specified city
 Given the city "New York" exists
 And Open-Meteo returns valid weather
 When I request activity rankings for "New York"
 Then the response status should be 200
 And the response should contain 7 forecast days
 And the activities should be sorted by descending score

Scenario: Get deterministic rankings for a valid city
 Given the city "Paris" exists
 And Open-Meteo returns a deterministic forecast
 When I request activity rankings for "Paris"
 Then the response status should be 200
 And the response should contain 7 forecast days
 And every activity score should be between 0 and 100

Scenario: Get rankings for a known built-in city
 Given Open-Meteo returns valid weather
 When I request activity rankings for "São Paulo"
 Then the response status should be 200
 And the response should contain 7 forecast days
 And the activities should be sorted by descending score
