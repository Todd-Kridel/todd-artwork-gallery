

// DISABLED ALTERNATE APPROACH IDEA


// const {Schema, model} = require("mongoose");
// const dateFormat = require("../utils/dateFormat");


// const commentSchema = new Schema({
//   commentText: 
//   {
//     type: String,
//     required: "You have to enter comment text.",
//     minlength: 1,
//     maxlength: 1000,
//     trim: true
//   }, 
//   commentAuthor: 
//   {
//     type: String,
//     required: true,
//     trim: true
//   }, 
//   commentArtworkId: 
//   {
//     type: String, 
//     required: true, 
//     trim: true
//   }, 
//   commentCreatedDate: 
//   {
//     type: String, 
//     default: (new Date()).toLocaleDateString()
//   }, 
//   commentRecordCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
//   {
//     type: Number, 
//     default: 1
//   }
//   //commentTimeSortId: 
//   //{
//   //  type: Number, 
//   //  default: Number(new Date())
//   //}
// });


// const Comment = model("Comment", commentSchema);


// module.exports = Comment;

