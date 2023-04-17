

const { Types, Schema, model } = require("mongoose");
//const dateFormat = require("../utils/dateFormat");


// the schema for creating the Supply sub-document
const supplySchema = new Schema({
//supplyRecordCollectionId: 
// {
//   type: Types.ObjectId,  // Use Mongoose's ObjectId data type
//   default: new Types.ObjectId()
// }, 
itemName: 
{
  type: String, 
  required: true, 
  default: ""
}, 
acquisitionLocation: 
{
  type: String, 
  required: false, 
  default: ""
}, 
acquisitionDate: 
{
  type: String, 
  required: false, 
  default: ""
},  
required: false, 
price: 
{ 
  type: Number, 
  required: true, 
  default: 0
}, 
notes: 
{
  type: String, 
  required: false, 
  default: ""
}, 
supplyRecordCounter: 
{
  type: Number, 
  default: 1
}, 
supplySumCounter: 
{
  type: Number, 
  default: 0
}
});


// the schema for creating the viewer comment sub-document
const viewerCommentSchema = new Schema({
// viewerCommentCollectionId: 
// {
//   type: Types.ObjectId,  // Use Mongoose's ObjectId data type
//   default: new Types.ObjectId()
// }, 
viewerCommentText: 
{
  type: String, 
  required: true, 
  maxLength: 280
}, 
viewerCommentAuthor: 
{
  type: String, 
  required: true
}, 
// viewerCommentArtworkId:
// {
//   type: Schema.Types.ObjectId,
//   ref: 'Artwork'
// }, 
viewerCommentCreatedDate: 
{
  type: String, 
  required: false, 
  //set: () => 
  //  {
  //const dateProcessing = new Date();
  //  dateProcessing.getMonth() + "/" + dateProcessing.getDate() + "/" + dateProcessing.getYear();
  //dateProcessing.getYear() + "/" + dateProcessing.getMonth() + "/" + dateProcessing.getDate();
  //return dateProcessing;  // .toLocaleDateString();
  //  }
  //default: (new Date().toLocaleString())
  default: (new Date().toISOString())
}, 
viewerCommentRecordCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
{
  type: Number, 
  default: 1
}, 
viewerCommentTimeSortId: 
{
  type: String, 
  default: (Number(Date.now())).toString()
}
});


const artworkSchema = new Schema({
title: 
{
  type: String, 
  required: false, 
  default: "Not Titled", 
  trim: true
}, 
artworkType: 
{
  type: String, 
  required: false, 
  default: "general", 
  trim: "true"
}, 
artworkStyle: 
{
  type: String, 
  required: false, 
  default: "general", 
  trim: "true"
},
artist: 
{
  type: String, 
  required: false, 
  default: "anonymous", 
  trim: "true"
}, 
picture: 
{
  type: String, 
  required: false, 
  default: "none", 
  trim: "true"
}, 
artworkCreatedDate: 
{ 
  type: String, 
  required: false, 
  default: "a non-specified date",
}, 
composition: 
{
  type: String, 
  required: false, 
  default: "general", 
  trim: "true"
}, 
relatedLocation: 
{
  type: String, 
  required: false, 
  default: "home studio", 
  trim: "true"
}, 
artistComments: 
{
  type: String, 
  required: false, 
  default: "none", 
  trim: "true"
}, 
size: 
{
  type: String, 
  required: false, 
  default: "", 
  trim: "true"
}, 
price: 
{
  type: Number, 
  required: false, 
  default: 0
}, 
saleStatus: 
{
  type: String, 
  required: false, 
  default: "Not For Sale", 
  trim: "true"
}, // (refer to purchase record; if none then display "for-sale"; otherwise "sold") 
recordCreatedDate: 
{ 
  type: String, 
  required: false, 
  //set: () => 
  //  {
  //const dateProcessing = new Date();
  //  dateProcessing.getMonth() + "/" + dateProcessing.getDate() + "/" + dateProcessing.getYear();
  //dateProcessing.getYear() + "/" + dateProcessing.getMonth() + "/" + dateProcessing.getDate();
  //return dateProcessing;  // .toLocaleDateString();
  //  }
  default: (new Date().toISOString())
}, 
supplies: [supplySchema], 
viewerComments: [viewerCommentSchema], 
artworkRecordCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
{
  type: Number, 
  default: 1
}, 
artworkTimeSortId: 
{
  type: String, 
  default: (Number(Date.now())).toString()
}
});
    

const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;

