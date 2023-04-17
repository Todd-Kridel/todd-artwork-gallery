

const { gql } = require("apollo-server-express");


const typeDefs = gql`
  

type Artwork 
{
  _id: ID
  title: String 
  artworkType: String 
  artworkStyle: String 
  artist: String 
  picture: String
  artworkCreatedDate: String
  composition: String
  relatedLocation: String
  artistComments: String
  size: String
  price: Float
  saleStatus: String
  recordCreatedDate: String
  supplies: [Supply]
  viewerComments: [ViewerComment]
  artworkRecordCounter: Int
  artworkTimeSortId: String
}


type Supply
{
  _id: ID
  itemName: String
  acquisitionLocation: String
  acquisitionDate: String
  price: Float
  notes: String
  supplyRecordCounter: Int
  supplySumCounter: Int
}


type ViewerComment
{
  _id: ID
  viewerCommentText: String
  viewerCommentAuthor: String
  viewerCommentCreatedDate: String
  viewerCommentRecordCounter: Int
  viewerCommentTimeSortId: String
}


type Comment
{
  _id: ID
  commentText: String
  commentAuthor: String
  commentArtworkId: String
  commentCreatedDate: String
  commentRecordCounter: Int
}


type User 
{
  _id: ID
  username: String
  email: String
  password: String
}


type Auth 
{
  token: ID!
  user: User
}


type Query 
{
  users: [User]
  user(username: String!): User
  currentUser(_id: ID!): User
  artworks: [Artwork]
  artwork(artworkId: ID!): Artwork
}


type Mutation 
{
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addViewerComment_(_id: ID!, commentText: String! commentAuthor: String!, commentArtworkId: String!): Comment
  addViewerComment(artworkId: ID!, commentText: String! commentAuthor: String!): Artwork
  addViewerCommentX(_id: ID!, viewerCommentText: String! viewerCommentAuthor: String!): Artwork
  addViewerComment__(artworkId: ID!, CommentText: String! CommentAuthor: String!): Artwork
  removeViewerComment(artworkId: ID!, viewerCommentId: ID!): Artwork
}


`;


module.exports = typeDefs;


// addViewerComment(artworkId: ID!, commentText: String! commentAuthor: String!): Artwork
// addViewerComment(artworkId: ID!, viewerCommentText: String! viewerCommentAuthor: String!): Artwork


//  type Supply
//  {
//    _id: ID
//    supplyRecordCollectionId: ID
//  }

