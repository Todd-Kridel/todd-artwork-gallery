

import React, {useState} from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import {useQuery} from "@apollo/client";
//import {QUERY_VIEWER_COMMENT} from "../../utils/queries";

const ViewerCommentList = ({comments, artworkId}) => {  // ({comments = []}, {artworkId})
  //const [getViewerComment, {error}] = useQuery(QUERY_VIEWER_COMMENT);
  
  //window.alert(artworkId)

  if (!comments.length)
    {
      return <h6 style={{textAlign: "center"}}>There are not yet any comments.</h6>;
    }


  function handleCommentListRecordViewLinkOnclick(commentId) {
    // LocalStorage:
    // SAVING: var variable_name = localStorage.setItem("name_of_key", "JSON.stringify(variable_name));
    localStorage.setItem("TKAG_artwork_comment_ID", commentId);
    //
    window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION" + "\n" +
    "Load information for comment record ID '" + commentId + "' that is for artwork '" + artworkId + "'.");
    let artwork;
    let data = "LOADED DATA THAT IS FROM THE SELECTED EXISTING COMMENT";
    //
    // INSERT SUCCESSFUL DATABASE QUERY PROCESS AT HERE. AT SO FAR IT HAVE BEEN NOT ABLE TO SUCCESSFULLY 
    // IMPLEMENT THE NECESSARY SUB-DOCUMENT QUERY PROCESS FOR THE RE-DISPLAY PROCESS. STRANGE ERRORS WERE 
    // OCCURRING. MORE INVESTIGATION IS NECESSARY.
    //
    //const data = await getViewerComment({variables: {artworkId, commentId}});
    //
      if (data)
      {
      // artwork = data; 
      // window.alert(artwork);
      // let comment = artwork.viewerComments;
      document.getElementById("viewerCommentTextField").value = data;
      document.getElementById("addCommentButton").style.display = "none";
      document.getElementById("updateCommentButton").style.display = "inline";
      document.getElementById("deleteCommentButton").style.display = "inline";
      }
      else
      {
      // artwork = {};
      }
    // try 
    // {
    //   const {loading, data} = await getViewerComment({
    //     variables: 
    //     {
    //       artworkId, 
    //       commentId 
    //     },
    //   });
    //   document.getElementById("viewerCommentTextField").value = data;
    // }
    // catch (err) 
    // {
    //   console.error(err);
    // }
    // finally
    // {
    // }
    window.location.href="#commentInputDisplayForm";
  };

  
    return (
      <>
        <h4 id="viewerCommentsList" style={{borderBottom: "1px solid gray", paddingBottom: "5px", 
          marginBottom: "20px", width: "100%"}}>
          Viewer Comments
        </h4>
        <div className="">
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="" style={{width: "100%", border: "none", margin: "0px auto"}} 
                id={comment._id}>
                <div className="" style={{background: "lightYellow", textAlign: "left", padding: "10px"}}>
                  <p className="" style={{margin: "0px"}}
                    >( by {comment.viewerCommentAuthor} during {comment.viewerCommentCreatedDate} )<br/>
                      {" "} 
                  </p>
                  <p className="" style={{margin: "0px"}}>{comment.viewerCommentText}</p>
                </div>
                <div className="" style={{backgroundColor: "lightgray", textAlign: "center", padding: "5px", 
                  borderBottom: "5px solid darkblue"}}>
                  <p className="" style={{margin: "0px"}}>
                    <span className="">Comment Record ID:&nbsp;
                    {((Auth.loggedIn()) && (Auth.getProfile().data.username == comment.viewerCommentAuthor)) ? (
                      <>
                        <Link 
                          onClick={() => handleCommentListRecordViewLinkOnclick(comment._id)}
                          to="">
                          <span>{comment._id}</span>
                        </Link><br/>
                        <span style={{backgroundColor: "yellow"}}>
                          Click the ID if you want to edit or delete the comment that you made.
                        </span>
                      </>
                      ) : (
                      <>
                        <span>{comment._id}</span>
                      </>
                    )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
};


export default ViewerCommentList;

