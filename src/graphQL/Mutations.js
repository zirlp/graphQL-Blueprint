import { gql } from "@apollo/client"


export const EDIT_COUNTRY_PROPERTIES = gql`

    mutation editCountryProperties($country: String! $comment: String $url: String) {
        editCountryProperties(country: $country comment: $comment url: $url) {
            comment
            url
        }
    }
`

export const CREATE_CONTACT = gql`

    mutation createContact($name: String! $country: String! $mail: String! $comment: String) {
        createContact(name: $name country: $country mail: $mail comment: $comment) {
            name
            country{
                name
            }
            mail
            comment
        }
    }
`
export const DELETE_CONTACT = gql`

    mutation deleteContact($code: ID! $country: String!) {
        deleteContact(code: $code country: $country) {
            name
        }
    }
`

export const EDIT_CONTACT = gql`

    mutation editContact($code: ID! $country: String! $name: String! $mail: String! $comment: String) {
        editContact(code: $code country: $country name: $name mail: $mail comment: $comment){
            name
            mail
            comment
        }
    }
`