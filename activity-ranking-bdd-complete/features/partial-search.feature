Feature: Partial Search

Scenario: Partial city lookup
 Given cities exist
 When I search for "Lon"
 Then matching cities are returned

Scenario: Case-insensitive partial city lookup
 Given cities exist
 When I search for "lon"
 Then matching cities are returned

Scenario: Partial search with a space
 Given cities exist
 When I search for "New"
 Then matching cities are returned

Scenario: Partial search returns multiple matches
 Given cities exist
 When I search for "o"
 Then matching cities are returned

Scenario: Unicode partial search handles accents
 Given cities exist
 When I search for "São"
 Then matching cities are returned
