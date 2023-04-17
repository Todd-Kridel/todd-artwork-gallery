

const {AuthenticationError} = require("apollo-server-express");
const {User, Artwork} = require("../models");
const {signToken} = require("../utils/auth");


const resolvers = 
{


Query: {
  users: async () => {
    return User.find();
  },
  user: async (parent, {username}) => {
    return User.findOne({username});  // .populate("artwork");
  },
  currentUser: async (parent, args, context) => {
    if (context.user) {
      return User.findOne({_id: context.user._id});  // .populate("artwork");
    }
    throw new AuthenticationError("You have to be logged-in.");
  },
  artworks: async () => {
    return Artwork.find().sort({recordCreatedDate: -1});
    // return Artwork.find().sort({artworkTimeSortId: -1});
  },
  artwork: async (parent, {artworkId}) => {
    return Artwork.findOne({_id: artworkId}).populate("viewerComments");
  }, 
  // viewerComments: async (parent, {artworkId}) => {
  //   return Artwork.viewerComments.find({_id: artworkId}).sort({viewerCommentCreatedDate: -1});
  // },
  // viewerComment: async (parent, {viewerCommentId}) => {
  //   return ViewerComment.findOne({_id: viewerCommentId});
  // },
  // viewerCommentsUser: async (parent, {}) => {
  //   const params = username ? {username} : {};
  //   return ViewerComment.find(params).sort({viewerCommentCreatedDate: -1});
  // },
},


Mutation: {
  addUser: async (parent, { username, email, password }) => {
    const user = await User.create({username, email, password});
    const token = signToken(user);
    return {token, user};
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({email});
    if (!user) {
      throw new AuthenticationError("There is not a user record that has the specified email address.");
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError("The specified credentials are not correct.");
    }
    const token = signToken(user);
    return {token, user};
  },
  
  // addViewerComment: async (parent, {_id, commentText, commentAuthor, artworkId}) => {  // , context
  //   if (_id) {
  //     //console.log(context.username);
  //     return Comment.findOneAndUpdate(
  //       {
  //         _id: _id, 
  //         commentText: commentText, 
  //         commentAuthor: commentAuthor, 
  //         commentArtworkId: artworkId},
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   }
  //   throw new AuthenticationError("You have to be logged-in.");
  // },

  addViewerComment: async (parent, {artworkId, commentText, commentAuthor}, context) => {
    console.log("outer call: " + artworkId + " " + commentText + " " + commentAuthor);
    if (context.user) {
      console.log("inner call: " + artworkId + " " + commentText + " " + commentAuthor);
      return Artwork.findOneAndUpdate(
        {_id: artworkId}, 
        {
          $addToSet: {
            viewerComments: {viewerCommentText: commentText, viewerCommentAuthor: commentAuthor}
          }, 
        }, 
        {
          new: true,
          runValidators: true,
        }
      );
    }
    throw new AuthenticationError("You have to be logged-in.");
  },

  // addViewerComment__: async (parent, {artworkId, commentText, commentAuthor}, context) => {
  //   if (context.artworkId) {
  //     console.log(context.commentText + " " + context.commentAuthor + " " + context.artworkId);
  //     return Artwork.findOneAndUpdate(
  //       {_id: artworkId}, 
  //       {
  //         $addToSet: {
  //           viewerComments: {viewerCommentText: context.commentText, viewerCommentAuthor: context.commentAuthor, 
  //             viewerCommentArtworkId: context.artworkId},
  //         }, 
  //       }, 
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   }
  //   throw new AuthenticationError("You have to be logged-in.");
  // },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
  //   if (context.user) {
  //     return Thought.findOneAndUpdate(
  //       { _id: thoughtId },
  //       {
  //         $pull: {
  //           comments: {
  //             _id: commentId,
  //             commentAuthor: context.user.username,
  //           },
  //         },
  //       },
  //       { new: true }
  //     );
  //   }
  //   throw new AuthenticationError('You need to be logged in!');
  // },

},
};


module.exports = resolvers;

