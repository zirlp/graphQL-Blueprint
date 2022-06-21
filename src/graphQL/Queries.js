import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  {
    countries {
      name
      native
      capital
      emoji
      continent {
        name
      }
      currency
      languages {
        code
        name
      }
    }
  }
`;
