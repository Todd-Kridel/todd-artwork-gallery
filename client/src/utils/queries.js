

import { gql } from "@apollo/client";


export const QUERY_USER = gql`
query user($username: String!) 
{
  user(username: $username) 
  {
    _id
    username
    email
  }
}
`;


export const QUERY_CURRENT_USER = gql`
query currentUser($_id: ID!) 
{
  currentUser(_id: $_id) 
  { 
    _id
    username
    email
  }
}
`;


export const QUERY_ARTWORKS = gql`
query getArtworks 
{
  artworks 
  {
    _id
    title
    artist
    picture
    artworkCreatedDate
    price
  }
}
`;


export const QUERY_SINGLE_ARTWORK = gql`
query getSingleArtwork($artworkId: ID!) 
{
  artwork(artworkId: $artworkId) 
  {
    _id
    title
    artworkType 
    artworkStyle
    artist
    picture
    artworkCreatedDate
    composition
    relatedLocation
    artistComments
    size
    price
    saleStatus
    recordCreatedDate
    supplies 
    {
      _id
      itemName
      acquisitionLocation
      acquisitionDate
      price
      notes
      supplyRecordCounter
      supplySumCounter
    }
    viewerComments 
    {
      _id
      viewerCommentText
      viewerCommentAuthor
      viewerCommentCreatedDate
    }
    artworkRecordCounter
  }
}
`;


export const QUERY_COMMENTS = gql`
query getComments 
{
  comments 
  {
  _id
  commentText
  commentAuthor
  commentArtworkId
  commentCreatedDate
  commentRecordCounter
  }
}
`;


// supplyRecordCollectionId
// viewerCommentCollectionId


// export const QUERY_VIEWER_COMMENTS = gql`
// query getViewerComments 
// {
//   viewerComments 
//   {
//     _id
//     viewerCommentText
//     viewerCommentAuthor
//     viewerCommentArtworkId
//     viewerCommentCreatedDate
//   }
// }
// `;


// export const QUERY_SINGLE_VIEWER_COMMENT = gql`
// query getSingleViewerComment($viewerCommentId: ID!) 
// {
//   viewerComment(viewerCommentId: $viewerCommentId) 
//   {
//     _id
//     viewerCommentText
//     viewerCommentAuthor
//     viewerCommentArtworkId
//     viewerCommentCreatedDate
//   }
// }
// `;

