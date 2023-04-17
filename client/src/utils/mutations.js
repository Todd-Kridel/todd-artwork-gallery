

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


// export const ADD_VIEWER_COMMENT = gql`
// mutation addViewerComment($artworkId: ID!, $commentText: String!, $commentAuthor: String!) 
// {
//   addViewerComment(_id: $artworkId, viewerCommentText: $commentText, viewerCommentAuthor: $commentAuthor) 
//   { 
//     _id
//     title
//     artworkType 
//     artworkStyle
//     artist
//     picture
//     artworkCreatedDate
//     composition
//     relatedLocation
//     artistComments
//     size
//     price
//     saleStatus
//     recordCreatedDate
//     supplies 
//     {
//       _id
//       itemName
//       acquisitionLocation
//       acquisitionDate
//       price
//       notes
//       supplyRecordCounter
//       supplySumCounter
//     }
//     viewerComments 
//     {
//       _id
//       viewerCommentText
//       viewerCommentAuthor
//     }
//   }
// }
// `;


// export const ADD_VIEWER_COMMENT_ = gql`
// mutation addViewerComment($viewerCommentArtworkId: ID!, $viewerCommentText: String!, $viewerCommentAuthor: String!) 
// {
//   addViewerComment(artworkId: $artworkId, viewerCommentText: $viewerCommentText, viewerCommentAuthor: $viewerCommentAuthor) 
//   { 
//     _id
//     title
//     artworkType 
//     artworkStyle
//     artist
//     picture
//     artworkCreatedDate
//     composition
//     relatedLocation
//     artistComments
//     size
//     price
//     saleStatus
//     recordCreatedDate
//     supplies 
//     {
//       _id
//       itemName
//       acquisitionLocation
//       acquisitionDate
//       price
//       notes
//       supplyRecordCounter
//       supplySumCounter
//     }
//     viewerComments 
//     {
//       _id
//       viewerCommentText
//       viewerCommentAuthor
//       viewerCommentArtworkId
//     }
//   }
// }
// `;


// export const ADD_VIEWER_COMMENT__ = gql`
// mutation addComment($artworkId: String!, $commentText: String!, $commentAuthor: String!) 
// {
//   addViewerComment(commentArtworkId: $artworkId, viewerCommentText: $commentText, viewerCommentAuthor: $commentAuthor) 
//     { 
//     comments 
//     {
//     _id
//     commentText
//     commentAuthor
//     commentArtworkId
//     commentCreatedDate
//     commentRecordCounter
//     }
//   }
// }
// `;


// supplyRecordCollectionId
// viewerCommentCollectionId


// export const ADD_VIEWER_COMMENT = gql`
//   mutation addViewerComment($viewerCommentText: String!, $viewerCommentAuthor: String!, $viewerCommentArtworkId: ID!) 
//   {
//     addViewerComment(viewerCommentText: $viewerCommentText, viewerCommentAuthor: $viewerCommentAuthor, viewerCommentArtworkId: $viewerCommentArtworkId) 
//     {
//       viewerCommentText
//       viewerCommentAuthor
//       viewerCommentArtworkId
//     }
//   }
// `;


