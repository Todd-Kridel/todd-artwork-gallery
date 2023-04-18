

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import Auth from "../../utils/auth";
import {ADD_VIEWER_COMMENT} from "../../utils/mutations";

// LocalStorage:
// Clearing the storage value to reset for the next comment/link selection.
//localStorage.setItem("TKAG_artwork_purchase_information", "");


const ViewerCommentForm = ({artworkId}) => {
  //const [commentId_, setCommentId_] = useState("");
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addViewerComment, {error}] = useMutation(ADD_VIEWER_COMMENT);

  //window.alert(artworkId);


  function handleCommentListRecordUpdateButtonOnclick() {
    // LocalStorage:
    // LOADING: var variable_name = JSON.parse(localStorage.getItem("name_of_key"));
    let commentId = localStorage.getItem("TKAG_artwork_comment_ID");
    // Clearing the storage value to reset for the next comment/link selection.
    //localStorage.setItem("TKAG_artwork_comment_ID", "");
    //
    window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION" + "\n" +
    "Update information for comment record ID '" + commentId + "' that is for artwork '" + artworkId + "'.");
    //
    // INSERT SUCCESSFUL DATABASE QUERY PROCESS AT HERE. AT SO FAR IT HAVE BEEN NOT ABLE TO SUCCESSFULLY 
    // IMPLEMENT THE NECESSARY SUB-DOCUMENT QUERY PROCESS FOR THE UPDATE PROCESS. STRANGE ERRORS WERE 
    // OCCURRING. MORE INVESTIGATION IS NECESSARY.
    //
    //const data = await updateViewerComment({variables: {artworkId, commentId}});
    //
    document.getElementById("viewerCommentTextField").value = "";
    document.getElementById("addCommentButton").style.display = "inline";
    document.getElementById("updateCommentButton").style.display = "none";
    document.getElementById("deleteCommentButton").style.display = "none";
    window.location.href=`#${commentId}`;
  }


  function handleCommentListRecordDeleteButtonOnclick() {
    // LocalStorage:
    // LOADING: var variable_name = JSON.parse(localStorage.getItem("name_of_key"));
    let commentId = localStorage.getItem("TKAG_artwork_comment_ID");
    // Clearing the storage value to reset for the next comment/link selection.
    //localStorage.setItem("TKAG_artwork_comment_ID", "");
    //
    window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION" + "\n" +
    "Delete information for comment record ID '" + commentId + "' that is for artwork '" + artworkId + "'.");
    //
    // INSERT SUCCESSFUL DATABASE QUERY PROCESS AT HERE. AT SO FAR IT HAVE BEEN NOT ABLE TO SUCCESSFULLY 
    // IMPLEMENT THE NECESSARY SUB-DOCUMENT QUERY PROCESS FOR THE DELETE PROCESS. STRANGE ERRORS WERE 
    // OCCURRING. MORE INVESTIGATION IS NECESSARY.
    //
    //const data = await deleteViewerComment({variables: {artworkId, commentId}});
    //
    document.getElementById("viewerCommentTextField").value = "";
    document.getElementById("addCommentButton").style.display = "inline";
    document.getElementById("updateCommentButton").style.display = "none";
    document.getElementById("deleteCommentButton").style.display = "none";
    window.location.href="#viewerCommentsList";
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try 
    {
      const {data} = await addViewerComment({
        variables: 
        {
          artworkId, 
          commentText, 
          commentAuthor: Auth.getProfile().data.username
        },
      });
      setCommentText("");
      document.getElementById("viewerCommentTextField").value = "";
      let alertMessage = "The new comment record has been successfully added to the database. " + 
        "You now can scroll the screen down to the bottom to view the updated comment list for " + 
        "the following record data." + "\n" + 
        "\n" + 
        commentText + "\n" + Auth.getProfile().data.username + "\n" + artworkId + "\n" + 
        "\n" + 
        "DATABASE RESPONSE:" + "\n" + 
        JSON.stringify(data);
      window.alert(alertMessage);
    }
    catch (err) 
    {
      console.error(err);
    }
    finally
    {
    
    }
  };


  const handleChange = (event) => {
    const {name, value} = event.target;
    //window.alert("CHANGE EVENT");
    if (name === "viewerCommentTextField" && (value.length <= 1000)) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  
  return (
    <div className="p-centered" style={{width: "100%"}}>
      <h4>You can make some comment[s] about this artwork if you want to.</h4>
      {Auth.loggedIn() ? (
        <>
          <p className={`${characterCount === 1000 || error ? "text-danger" : ""}`} 
            style={{marginTop: "10px"}}>
            {!error ? `Character Count: ${characterCount}/1000` : <span className="">{error.message}</span>}
          </p>
          <div id="commentInputDisplayForm" className="" style={{width: "100%"}}>
            <form className="p-centered" style={{width: "100%"}} onSubmit={handleFormSubmit}>
              <textarea
                id="viewerCommentTextField"
                name="viewerCommentTextField"
                placeholder="Add your comment."
                //value= {commentText}
                style={{resize: "none", width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px", 
                padding: "10px"}}
                onChange={handleChange}>
              </textarea>
              <div className="">
                <button id="addCommentButton" className="buttonHighlight" type="submit">
                  Add Comment
                </button>
                <button id="updateCommentButton" className="buttonHighlight" type="button" style={{display: "none"}} 
                  onClick={() => handleCommentListRecordUpdateButtonOnclick()}>
                  Update Comment
                </button>
                <button id="deleteCommentButton" className="buttonHighlight" type="button" style={{display: "none"}} 
                  onClick={() => handleCommentListRecordDeleteButtonOnclick()}>
                  Delete Comment
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>You have to be logged-in to share your comments about the art that is on this website.<br/>
          <br/>
          <br/>
          <Link to="/login">
            <span class="buttonHighlight" style={{padding: "10px", margin: "5px"}}>Log&#8209;In</span>
          </Link>&nbsp; &nbsp;
          <Link to="/signup">
            <span class="buttonNonHighlight" style={{padding: "10px", margin: "5px"}}>Sign&#8209;Up.</span>
          </Link>
          <br/>
          <br/>
        </p>
      )}
    </div>
  );
};


export default ViewerCommentForm;

