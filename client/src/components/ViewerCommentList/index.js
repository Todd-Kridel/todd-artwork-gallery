

import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";


const ViewerCommentList = ({comments = []}) => {

  
  if (!comments.length)
    {
      return <h6 style={{textAlign: "center"}}>There are not yet any comments.</h6>;
    }

    
  return (
    <>
      <h4 style={{borderBottom: "1px solid gray", paddingBottom: "5px", marginBottom: "20px", width: "100%"}}>
        Viewer Comments
      </h4>
      <div className="">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="" style={{width: "100%", border: "none", margin: "0px auto"}}>
              <div className="" style={{background: "lightYellow", textAlign: "left", padding: "10px"}}>
                <p className="" style={{margin: "0px"}}
                  >( by {comment.viewerCommentAuthor} during {comment.viewerCommentCreatedDate} )<br/>
                    {" "} 
                </p>
                <p className="" style={{margin: "0px"}}>{comment.viewerCommentText}</p>
              </div>
              <div className="" style={{backgroundColor: "lightgray", textAlign: "center", padding: "5px"}}>
                <p className="" style={{margin: "0px"}}>
                  <span className="">Comment Record ID&nbsp;:&nbsp;
                  
                  <Link 
                    onClick={() => 
                      window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION" + "\n" +
                      "Load information for comment record ID '" + comment._id + "'"
                      )}
                    to="">
                    <span>{comment._id}</span>
                  </Link> &nbsp; 
                  {((Auth.loggedIn()) && (Auth.getProfile().data.username == comment.viewerCommentAuthor)) ? (
                      <><br/>Click the ID if you want to edit or delete the comment that you made.</>
                    ) : (
                      <>
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

