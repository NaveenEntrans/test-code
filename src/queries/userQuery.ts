import gql from 'graphql-tag'

const GET_USERS = gql`
  query MyQuery {
    user_test {
      email
      profilephoto
      firstName
      gender
      id
      lastName
      mobile
      role
      company
      usertype
    }
  }
`
const ADD_USER = gql`
  mutation AddUser(
    $email: String
    $firstName: String
    $lastName: String
    $password: String
    $gender: String
    $mobile: numeric
    $role: String
    $company: String
    $usertype: String
  ) {
    insert_user_test(
      objects: [
        {
          email: $email
          password: $password
          firstName: $firstName
          lastName: $lastName
          gender: $gender
          mobile: $mobile
          role: $role
          company: $company
          usertype: $usertype
          profilephoto: "data"
        }
      ]
    ) {
      returning {
        id
        email
      }
    }
  }
`
export { GET_USERS, ADD_USER }
