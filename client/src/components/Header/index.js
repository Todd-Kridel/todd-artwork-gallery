

import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";

//import Todd from "../../public/images/Todd.jpg";
// <img src={"./images/Todd.jpg"} style={{border: "10px solid white", width: "100%"}} >


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="background-light-gray" style={{marginBottom: "100px"}}>
      <div style={{display: "flex", flexWrap: "noWrap", flexDirection: "row", marginLeft: "10px", width: "auto", 
        padding: "20px"}}>
        <div style={{display: "flex", flexWrap: "noWrap", flexDirection: "row", width: "65%", marginRight: "10px"}}>
          <div style={{width: "100%", minHeight: "250px", maxHeight: "400px", marginLeft: "15px", marginRight: "15px", 
            paddingTop: "5%", paddingBottom: "5%"}}>
            <Link className="text-light" to="/">
              <h1 className="outlined" 
              style={{fontFamily: "'Comic Sans MS', Arial, Helvetica, cursive, sans-serif", fontSize: "3em", color: "purple"}}>
              Todd's Artwork Gallery and Store Webpage</h1>
            </Link>
            <p className="m-0">~ attempts at creative expression...by a guy who has a paintbrush hairdo ~</p>
          </div>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", width: "35%", marginRight: "10px"}}>
          <div style={{width: "50%", paddingTop: "10px", paddingLeft: "10px"}}>
            <div style={{width: "100%"}}>
              <p style={{width: "100%"}}>
                <img src={"../images/Todd.jpg"} onClick={() => window.open("../images/Todd.jpg")} 
                  style={{border: "10px solid white", width: "100%", cursor: "pointer"}} >
                  </img><p style={{width: "100%", textAlign: "center"}} className="p-centered">
                    a head in the header</p>
              </p>
            </div>
          </div>
          <div style={{width: "40%", marginTop: "10px", marginLeft: "5px", marginRight: "10px"}}>
            {Auth.loggedIn() ? (
              <>
                <p className="buttonHighlight" style={{minWidth: "120px"}} 
                  onClick={() => window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION")}>
                  <Link 
                    to="/">
                    View Your User Profile
                    {/*to="/currentUser">*/}
                    {/* {Auth.getProfile().data.username}'s profile */}
                  </Link><br/>
                </p>
                <button className="buttonNonHighlight, p-centered" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <br/>
                <p>
                <Link className="buttonHighlight" to="/login">
                  Login
                </Link>
                </p>
                <br/>
                <br/>
                <p>
                <Link className="buttonNonHighlight" to="/signup">
                  Signup
                </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;

