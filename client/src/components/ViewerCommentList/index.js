

import React from "react";


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
                  <span className="">Comment Record ID</span>: {comment._id}<br/>
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};


export default ViewerCommentList;

