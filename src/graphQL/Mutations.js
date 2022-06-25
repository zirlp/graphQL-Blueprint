import { gql } from "@apollo/client"


export const EDIT_COUNTRY_PROPERTIES = gql`

mutation editCountryProperties($country: String! $comment: String $url: String) {
    editCountryProperties(country: $country comment: $comment url: $url) {
        comment
        url
    }
}

`
