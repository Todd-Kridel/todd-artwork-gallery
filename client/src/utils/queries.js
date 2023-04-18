

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


export const QUERY_VIEWER_COMMENT = gql`
query getViewerComment($artworkId: ID!, $commentId: ID!)
{  
  artwork(artworkId: $artworkId) 
  {
    _id
    title
    viewerComments(commentId: $commentId)
    {
      _id
      viewerCommentText
      viewerCommentAuthor
      viewerCommentCreatedDate
    }
  }
}
`;


/*
export const QUERY_VIEWER_COMMENTS = gql`
query getViewerComments($artworkId: ID!)
{  
  artwork(artworkId: $artworkId) 
  {
    _id
    title
    viewerComments 
    {
      _id
      viewerCommentText
      viewerCommentAuthor
      viewerCommentCreatedDate
    }
}
`;
*/

