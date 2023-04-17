import gql from "graphql-tag";

const GET_ROLE = gql`
query MyQuery {
  UserType {
    ID
    UserTypeName
  }
  Role {
    ID
    RoleName
  }
}

`;
const GET_USERS = gql`
  query MyQuery {
    User {
      FirstName
      LastName
      Password
      Gender
      UserTypeID
      Email
      Mobile
      RoleID
      LastLoginDateTime
      ProfilePicture
      CreatedBy
      CreatedDateTime
      ModifiedBy
      ModifiedDateTime
      IsActive
    }
  }
`;
const UPDATE_USER = gql`
  mutation Updateuser(
    $id: Int!
    $email: String
    $firstName: String
    $lastName: String
    $gender: String
    $mobile: numeric
    $role: String
    $company: String
    $usertype: String
    $profilephoto: String
  ) {
    update_user_test_by_pk(
      pk_columns: { id: $id }
      _set: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        mobile: $mobile
        role: $role
        company: $company
        usertype: $usertype
        profilephoto: $profilephoto
      }
    ) {
      id
      email
    }
  }
`;
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
    $ProfilePicture: String
  ) {
    insert_user_test(
      objects: [
        {
          FirstName: $firstName
          LastName: $lastName
          Password: $password
          Gender: $gender
          UserTypeID: String
          Mobile: $mobile
          RoleID: $role
          ProfilePicture: $ProfilePicture
          CreatedDateTime: String
          IsActive: true
        }
      ]
    ) {
      returning {
        id
        email
      }
    }
  }
`;
export { GET_USERS, ADD_USER, UPDATE_USER, GET_ROLE };
