

import React from "react";
import {useParams} from "react-router-dom";
import ViewerCommentList from "../components/ViewerCommentList";
import ViewerCommentForm from "../components/ViewerCommentForm";
import {useQuery} from "@apollo/client";
import {QUERY_SINGLE_VIEWER_COMMENT} from "../utils/queries";


const SingleViewerComment = () => {
  // Use `useParams()` to retrieve the value of the route parameter `:commentId`
  const {commentId} = useParams();


  const {loading, data} = useQuery(QUERY_SINGLE_VIEWER_COMMENT, {
    // pass URL parameter
    variables: {commentId: commentId},
  });
  const comment = data?.comment || {};


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {comment.viewerCommentAuthor}: commented during {comment.viewerCommentCreatedDate}
      </h3>
      <div className="bg-light py-4">
          {comment.viewerCommentText}
      </div>
      <div className="my-5">
        <ViewerCommentList comments={comment.comments} />
      </div>
      <div className="m-3 p-4" style={{border: '1px solid gray'}}>
        <ViewerCommentForm commentId={comment._id} />
      </div>
    </div>
  );
};


export default SingleViewerComment;

