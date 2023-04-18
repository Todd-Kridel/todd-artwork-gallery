

import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import {useLocation} from "react-router-dom";

//import Todd from "../../public/images/Todd.jpg";
// <img src={"./images/Todd.jpg"} style={{border: "10px solid white", width: "100%"}} >


const Header = () => {
  const location = useLocation();


  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="background-light-gray" style={{marginBottom: "100px"}}>
      {(location.pathname == "/") ? (
        <div style={{display: "flex", flexWrap: "Wrap", flexDirection: "row", justifyContent: "space-between", marginLeft: "25px", 
          marginRight: "25px", width: "auto", padding: "10px"}}>
          <div style={{display: "flex", flexWrap: "noWrap", flexDirection: "row", width: "auto", maxWidth: "60%", marginRight: "10px"}}>
            <div style={{width: "auto", minHeight: "250px", marginLeft: "15px", marginRight: "15px", 
              paddingTop: "5%", paddingBottom: "5%"}}>
              <Link className="text-light" to="/">
                <h1 className="outlined" 
                style={{fontFamily: "'Comic Sans MS', Arial, Helvetica, cursive, sans-serif", fontSize: "3em", color: "purple"}}>
                Todd's Artwork Gallery and Store Webpage</h1>
              </Link>
              <p className="m-0">~ attempts at creative expression...by a guy who has a paintbrush hairdo ~</p>
            </div>
          </div>
          <div style={{display: "flex", flexWrap: "noWrap", flexDirection: "row", Width: "40%", marginRight: "0px"}}>
            <div style={{minWidth: "auto", paddingTop: "10px", paddingLeft: "10px", marginRight: "25px"}}>
              <div style={{width: "200px"}}>
                <p style={{width: "auto"}}>
                  <img src={"../images/Todd.jpg"} onClick={() => window.open("../images/Todd.jpg")} 
                    style={{border: "10px solid white", maxWidth: "200px", marginTop: "25px", cursor: "pointer"}} >
                    </img><p style={{width: "100%", textAlign: "center"}} className="p-centered">
                      a head in the header</p>
                </p>
              </div>
            </div>
            <div style={{width: "auto", marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
              {Auth.loggedIn() ? (
                <>
                  <p className="buttonHighlight" style={{maxWidth: "120px"}} 
                    onClick={() => window.alert("FUTURE ENHANCEMENT -- TBD -- UNDER CONSTRUCTION")}>
                    <Link 
                      to="/">
                      View Your User Profile
                      {/*to="/currentUser">*/}
                      {/* {Auth.getProfile().data.username}'s profile */}
                    </Link><br/>
                  </p>
                  <button className="buttonNonHighlight p-centered" style={{padding: "10px"}} onClick={logout}>
                    Log&#8209;Out
                  </button>
                </>
              ) : (
                <>
                  <br/>
                  <p>
                  <Link className="buttonHighlight" style={{padding: "10px"}} to="/login">
                    Log&#8209;In
                  </Link>
                  </p>
                  <br/>
                  <br/>
                  <p>
                  <Link className="buttonNonHighlight" style={{padding: "10px"}} to="/signup">
                    Sign&#8209;Up
                  </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p class="p-centered">
          <br/>
          <br/>
          <Link to="/">
            <span class="buttonHighlight" style={{padding: "10px", margin: "5px"}}>Home&nbsp;Page</span>
          </Link>
          <br/>
          <br/>
        </p>
      )}
    </header>
  );
};


export default Header;

