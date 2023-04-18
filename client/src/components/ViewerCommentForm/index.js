

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import Auth from "../../utils/auth";
import {ADD_VIEWER_COMMENT} from "../../utils/mutations";


const ViewerCommentForm = ({artworkId}) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addViewerComment, {error}] = useMutation(ADD_VIEWER_COMMENT);

  //window.alert(artworkId);


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
          <div className="" style={{width: "100%"}}>
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
                <button className="buttonHighlight" type="submit">
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>
          You have to be logged-in to share your comments about the art that is on this website.{" "}<br/><br/>
            <Link to="/login"><span class="buttonHighlight">Log-In</span></Link> or 
            <Link to="/signup"><span class="buttonNonHighlight">Sign-Up.</span></Link><br/><br/>
        </p>
      )}
    </div>
  );
};


export default ViewerCommentForm;

