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
    User(order_by: {CreatedDateTime: desc}, where: {IsActive: {_eq: true}}) {
      ID
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
      Corporate
      UserType
      Role
    }
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
const UPDATE_USER = gql`
mutation update_an_article (
  $ID:uuid!
  $FirstName : String
  $LastName : String
  $Corporate : String
  $Email : String
  $Gender : String
  $ProfilePicture : String
  $Role : String
  $UserType : String
  $Mobile : String
  $IsActive : Boolean
  
){
  update_User_by_pk (
    pk_columns: {ID:$ID
 }
    _set: { 
      FirstName: $FirstName
      LastName: $LastName
      Corporate: $Corporate
      Email: $Email
      Gender:$Gender
      ProfilePicture:$ProfilePicture
      Role:$Role
      UserType:$UserType
      Mobile:$Mobile
      IsActive:$IsActive
     }
  ) {
    ID

  }
}
`;
                                                                                                      
const ADD_USER = gql`
  mutation   AddUser_an_article(
   
    $Corporate: String
    $Email: String
    $FirstName: String
    $LastName: String
    $Gender: String
    $IsActive: Boolean
    $ProfilePicture: String
    $Role: String
    $UserType: String
    $CreatedBy: uuid
    $ModifiedBy: uuid
    $RoleID: uuid
    $UserTypeID: uuid
    $Mobile: String
    $Password: String
    
  ) {
    insert_User(
      objects: [
        {
         
          Corporate: $Corporate
          Email: $Email
          FirstName: $FirstName
          LastName: $LastName
          Gender: $Gender
          IsActive: $IsActive
          ProfilePicture: $ProfilePicture
          Role: $Role
          UserType: $UserType
          CreatedBy: $CreatedBy
          ModifiedBy: $ModifiedBy
          RoleID: $RoleID
          UserTypeID: $UserTypeID
          Mobile: $Mobile
          Password: $Password
        }
      ]
    ) {
      returning {
        ID
        Email
      }
    }
  }
`;

const GET_USERS_SEARCH_COUNT = gql`
query ($search: String!, $limit: Int!, $offset: Int!) {
  User(
    where: {
      _or: [{Email: {_like: $search}}, {Corporate: {_like: $search}} , {Mobile: {_like: $search}},{FirstName: {_like: $search}},{LastName: {_like: $search}},{Gender: {_like: $search}},{Role: {_like: $search}},{UserType: {_like: $search}},{Password: {_like: $search}},{ProfilePicture: {_like: $search}}]
    },
    limit: $limit,
    offset: $offset
  ) {
ID
   
    Email
    Corporate
    FirstName
    Gender
    Mobile
    Password
    ProfilePicture
    Role
    RoleID
    UserType
    UserTypeID
    LastName
  }
  User_aggregate(where: {IsActive: {_eq: true}}) {
    aggregate {
      count
    }
  }
}
`;

const ENTITY_UER = gql`
query ($search: String!, $limit: Int!, $offset: Int!) {
  Entity(
    where: {
      _or: [{Description: {_like: $search}}, {Address1: {_like: $search}},{Address2: {_like: $search}},{Address2: {_like: $search}},{Pin: {_like: $search}},{City: {_like: $search}},{State: {_like: $search}},{Country: {_like: $search}}]
    },
    limit: $limit,
    offset: $offset
  ) {
ID
    Description
    Address1
    Address2
    Pin
    City
    Country
    State
    BannerImage
    Logo
  }
  User_aggregate(where: {IsActive: {_eq: true}}) {
    aggregate {
      count
    }
  }
}

`


export { GET_USERS, ADD_USER, UPDATE_USER, GET_ROLE,GET_USERS_SEARCH_COUNT,ENTITY_UER };
