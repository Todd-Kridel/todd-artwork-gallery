

import {React, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ViewerCommentList from "../components/ViewerCommentList";
import ViewerCommentForm from "../components/ViewerCommentForm";
import {QUERY_SINGLE_ARTWORK} from '../utils/queries';


const SingleArtwork = () => {
  // Use "useParams()" to retrieve the value of the route parameter ":artworkId".
  const {artworkId} = useParams();


  function BackToTopButton() {
    function scrollWindowToTop() {
      window.scrollTo(0,0);
    }
  return (
  //<BackToTopButton />
  <div style={{position: "fixed", top: "90%", zIndex: "100"}}>
    <button style={{borderRadius: "8px"}} onClick={scrollWindowToTop}>Back to Top</button>
  </div>
  )
  }


  const {loading, data} = useQuery(QUERY_SINGLE_ARTWORK, {
  // Pass the URL parameter to the artwork database query.
  variables: {artworkId: artworkId},
  });

  const artwork = data?.artwork || {};
  const artworkPicture = "./images/" + artwork.picture;
  let commentsArray = [];

  if ((artwork.viewerComments != undefined) && (artwork.viewerComments.length >= 1)) 
    {
      // window.alert(JSON.stringify(artwork.viewerComments[0]));
      commentsArray = (artwork.viewerComments).slice();
      // const {viewerCommentAuthor, viewerCommentText, viewerCommentCreatedDate} = commentsArray[0];
      // window.alert(
      //   viewerCommentAuthor + "\n" + 
      //   viewerCommentText + "\n" + 
      //   viewerCommentCreatedDate
      // )
    }
  else
    {
      commentsArray = 0;
    }


  // When a new page content section is rendered at after being selected by button/link click...then  
  // scroll the view of that new content to the top...for in case that a previous page has already 
  // been viewed/scrolled to a lower section of the page view space.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  function handleContactFormClick() {
    let localStorageArtworkInformation =
      `This contact message is for an inquiry about the following artwork: <br/> 
      <br/>
      Artwork:<br/> 
      Title: ${artwork.title} <br/> 
      Type:  ${artwork.artworkType} <br/> 
      Style: ${artwork.artworkStyle} <br/> 
      Artist: ${artwork.artist} <br/> 
      Composition: ${artwork.composition} <br/> 
      Related Location: ${artwork.relatedLocation} <br/> 
      Artist Comments: ${artwork.artistComments} <br/> 
      Size: ${artwork.size} <br/> 
      Creation Date: ${artwork.artworkCreatedDate} <br/> 
      Price: $${artwork.price} <br/> 
      Sale Status: ${artwork.saleStatus}`;
    localStorageArtworkInformation = (localStorageArtworkInformation.replaceAll("\n", "")).trim();
    // LocalStorage:
    // SAVING: var variable_name = localStorage.setItem("name_of_key", "JSON.stringify(variable_name));
    localStorage.setItem("TKAG_artwork_purchase_information", localStorageArtworkInformation);
    //localStorage.setItem("TKAG_artwork_purchase_information", JSON.stringify(localStorageArtworkInformation));
    //window.alert("From the Artwork detailed information view page: " + "\n\n" + localStorageArtworkInformation);
  }


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="BodyContentContainer" className="">
      <p className="outlined" style={{textAlign: "center", fontSize: "1.5em", color: "white"}}>
        <img src={`../images/${artwork.picture}`} 
          style={{width: "90%", padding: "5px", border: "10px solid white"}}></img><br/>
        {/*({artworkPicture})*/}</p>
      <br/>
      <br/>
      <br/>
      <br/>
      <h3 className="" style={{backgroundColor: "lightblue", color: "black", border: "10px solid lightyellow", 
        padding: "10px"}}>
        Title: {artwork.title}<br/>
      </h3>
      <div className="" style={{backgroundColor: "tan", padding: "10px", marginTop: "-8px"}}>
        <p>Type: {artwork.artworkType}</p>
        <p>Style: {artwork.artworkStyle}</p>
        <p>Artist: {artwork.artist}</p>
        <p>Composition: {artwork.composition}</p>
        <p>Related Location: {artwork.relatedLocation}</p>
        <p>Artist Comments: {artwork.artistComments}</p>
        <p>Size: {artwork.size}</p>
        <p>Creation Date: {artwork.artworkCreatedDate}</p>
        <p>Price: ${artwork.price}<br/>
          If this artwork is for sale...then you can use the "Contact Form" to send a message to me 
          to discuss about a purchase.
          <br/>
            <span className="linkButton" onClick={handleContactFormClick}>
            <Link to={"/contact/purchase_request"}>
              Contact Form plus included artwork information
            </Link>
            </span>
          <br/>
          You can access that form by clicking the form name text 
          button at above or by clicking the email address link that is at the bottom of this screen. 
          The button has a convenience of pre-entering some artwork information into the message field.</p>
        <p>Sale Status: {artwork.saleStatus}</p>
        <p>Record Created Date: {artwork.recordCreatedDate}</p>
      </div>
      <br/>
      <br/>
      <div className="" style={{border: "10px solid lightyellow", backgroundColor: "lightblue", width: "100%", 
        paddingLeft: "10%", paddingRight: "10%", paddingTop: "10px", marginTop: "75px"}}>
        <p style={{fontWeight: "bold", textAlign: "center"}}>
          <ViewerCommentForm artworkId={artwork._id} />
        </p>
      </div>
      <div key={artwork._id} style={{width: "100%", border: "none", margin: "0px auto"}}>
          <div className="background-dark-dark-gray" style={{color: "white", textAlign: "center", padding: "0px"}}>
            <p className="" style={{margin: "0px"}}>
              <span className="">Artwork ID</span>: {artwork._id}
            </p>
          </div>
      </div>
      <div className="" style={{backgroundColor: "tan", width: "100%", paddingTop: "20px", paddingLeft: "10%", 
        paddingRight: "10%"}}>
        <ViewerCommentList comments={artwork.viewerComments} />
        <br/>
        <br/>
        <br/>
        <br/>
        {/*
        {commentsArray && commentsArray.map((comment) => (
        <div key={comment._id} style={{width: "90%", border: "none", margin: "0px auto"}}>
        <div className="background-light-light-blue" style={{textAlign: "left", padding: "30px"}}>
        <p className="" style={{margin: "10px"}}>
          <span className="underlined">By</span>:<br/>
          {comment.viewerCommentAuthor}<br/>
          <span className="underlined">Comment</span>:<br/>
          {comment.viewerCommentText}<br/>
          <span className="underlined">Created Date</span>:<br/>
          {comment.viewerCommentCreatedDate}<br/>
          <span className="underlined">Comment Record ID</span>:<br/>
          {comment.viewerCommentCollectionId} {comment._id}<br/>
          <span className="underlined">Artwork ID</span>:<br/>
          {artwork._id}
        </p>
        </div>
        <br/>
        <hr/>
        <br/>
        </div>
        ))}
        */}
      </div>
      <BackToTopButton />
    </div>
  );
};


export default SingleArtwork;


{/*
<div className="my-5">
  <SupplyList comments={artwork.supplies} />
</div>
*/}

