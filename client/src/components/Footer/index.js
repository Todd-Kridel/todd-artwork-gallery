

import React from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <footer className="background-light-gray" style={{marginTop: "100px"}}>
      <br/>
      <br/>
      <div className="p-centered">
        {location.pathname !== "/" && (
          <button className="buttonHighlight p-centered" onClick={() => navigate(-1)}>
            Go Back
          </button>
        )}
        {((location.pathname !== "/contact") && (location.pathname !== "/contact/purchase_request")) && (
        <h4 style={{fontFamily: "'Comic Sans MS', Arial, Helvetica, cursive, sans-serif",  
          marginLeft: "15%", marginRight: "15%"}}>
          <Link to={"/contact"}>
            <span className="outlined" style={{fontSize: "1.25em", margin: "10px"}}>
              <br/>todd.kridel@gmail.com<br/>
            </span>
          </Link>
          <p style={{lineHeight: "1em", paddingTop: "10px"}}>Click on my email address to contact me.</p>
        </h4>
        )}
        <br/>
        <br/>
      </div>
    </footer>
  );
};


export default Footer;

