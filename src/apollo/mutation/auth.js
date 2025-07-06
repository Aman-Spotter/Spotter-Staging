import { gql } from '@apollo/client';

export const REGISTER_CUSTOM_SUBSCRIPTION = () => gql`
  mutation register(
    $broker: BrokerInput
    $dispatcher: DispatcherInput
    $subscriptionItem: SubscriptionItemInputType
    $email: String!
    $firstName: String
    $lastName: String
    $phone: String
    $phoneExt: String
    $type: String!
    $username: String!
    $userDisplayName: String!
    $isDriverApp: Boolean
  ) {
    register(
      broker: $broker
      dispatcher: $dispatcher
      subscriptionItem: $subscriptionItem
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      phoneExt: $phoneExt
      type: $type
      username: $username
      userDisplayName: $userDisplayName
      isDriverApp: $isDriverApp
    ) {
      success
      errors
      subscription {
        subscriptionId
        clientSecret
        priceAmount
      }
    }
  }
`;

export const LOGIN = gql`
  mutation tokenAuth($email: String, $username: String, $password: String!) {
    tokenAuth(email: $email, username: $username, password: $password) {
      token
      success
      errors
      user {
        username
        displayName
      }
      unarchiving
      payload
      refreshExpiresIn
    }
  }
`;

export const PASSWORD_SET = gql`
  mutation passwordSet($token: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordSet(token: $token, newPassword1: $newPassword1, newPassword2: $newPassword2) {
      success
      errors
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation passwordReset($token: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordReset(token: $token, newPassword1: $newPassword1, newPassword2: $newPassword2) {
      success
      errors
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation passwordChange($oldPassword: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordChange(
      oldPassword: $oldPassword
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      errors
    }
  }
`;

export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`;
