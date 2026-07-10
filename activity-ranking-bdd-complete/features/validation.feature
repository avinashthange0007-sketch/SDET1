Feature: Validation

Scenario Outline: Invalid city
 When I request activity rankings for "<city>"
 Then the response status should be 400
Examples:
|city|
||
| |

Scenario: Unknown city returns not found
 Given the city "Atlantis" does not exist
 When I request activity rankings for "Atlantis"
 Then the response status should be 404
