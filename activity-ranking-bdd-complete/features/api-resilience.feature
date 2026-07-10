Feature: API Resilience

Scenario: Missing city parameter returns bad request
 When I request activity rankings for ""
 Then the response status should be 400

Scenario: Unknown city returns not found
 Given the city "Atlantis" does not exist
 When I request activity rankings for "Atlantis"
 Then the response status should be 404

Scenario: Mixed-case city lookup is accepted
 Given the city "London" exists
 When I request activity rankings for "lOnDoN"
 Then the response status should be 200

Scenario: Whitespace-only city input is rejected
 Given the city "London" exists
 When I request activity rankings for "   "
 Then the response status should be 400

Scenario: Service unavailable returns fallback response
 Given Open-Meteo is unavailable
 When I request activity rankings
 Then the response status should be 503

Scenario: Unknown city with trimmed whitespace returns not found
 Given the city "Paris" does not exist
 When I request activity rankings for " Paris "
 Then the response status should be 404
