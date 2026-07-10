Feature: Additional Validation

Scenario: Case insensitive lookup
 Given the city "London" exists
 When I request activity rankings for "london"
 Then the response status should be 200

Scenario: Unicode city
 Given the city "São Paulo" exists
 When I request activity rankings for "São Paulo"
 Then the response status should be 200

Scenario: Ordered activities
 Given Open-Meteo returns valid weather
 When I request activity rankings
 Then the activities should be sorted by descending score

Scenario: Score validation
 Given Open-Meteo returns valid weather
 When I request activity rankings
 Then every activity score should be between 0 and 100

Scenario: Weather timeout
 Given Open-Meteo is unavailable
 When I request activity rankings
 Then the response status should be 503

Scenario: Idempotent response
 Given Open-Meteo returns a deterministic forecast
 When I request activity rankings twice
 Then both responses should be identical

Scenario: Known built-in city is accepted without explicit setup
 Given Open-Meteo returns valid weather
 When I request activity rankings for "Paris"
 Then the response status should be 200
