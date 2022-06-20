import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
      capital
      continent {
        name
      }
    }
  }
`;

export const LIST_CONTINENTS = [
  //it should be build from an iteration of all possible continents
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Asia",
  "Antarctica",
  "Oceania",
];
