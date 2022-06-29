import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  {
    countries {
      code
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
      comment
      url
      contacts {
        code
        name
        mail
        comment
      }
    }
  }
`

export const LIST_CONTACTS = gql`
  {
    contacts {
      code
      name
      country {
        name
      }
      mail
      comment
    }
  }
`
