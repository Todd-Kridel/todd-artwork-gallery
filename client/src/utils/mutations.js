

import {gql} from "@apollo/client";


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) 
{
  login(email: $email, password: $password) 
  {
    token
    user 
    {
      _id
      username
    }
  }
}
`;


export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) 
{
  addUser(username: $username, email: $email, password: $password) 
  {
    token
    user 
    {
      _id
      username
    }
  }
}
`;


export const ADD_VIEWER_COMMENT = gql`
mutation addViewerComment($artworkId: ID!, $commentText: String!, $commentAuthor: String!) 
{
  addViewerComment(artworkId: $artworkId, commentText: $commentText, commentAuthor: $commentAuthor) 
  { 
    _id
    viewerComments 
    {
      viewerCommentText
      viewerCommentAuthor
    }
  }
}
`;

