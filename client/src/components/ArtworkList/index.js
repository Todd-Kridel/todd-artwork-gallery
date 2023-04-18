

import React from "react";
import {Link} from "react-router-dom";


const ArtworkList = ({
artworks,
title,
showTitle = true,
showUsername = true,
}) => {


if (!artworks.length) 
  {
  return <p className="h3-centered outlined">There are not yet any artworks.</p>;
  }


return (
<div>
  {showTitle && <p className="h2-centered outlined">{title}</p>}
  <br/>
  <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly"}}>
  {artworks && artworks.map((artwork) => (
    <div key={artwork._id} style={{width: "300px", border: "none", marginTop: "50px", marginBottom: "25px", 
      marginLeft: "25px", marginRight: "25px"}}>
      <div className="" style={{backgroundColor: "tan", padding: "10px"}}>
        <p className="h3-centered">{artwork.title}</p>
        {artwork.price > 0 ? <p className="p-centered">Price: ${artwork.price}</p> : <p className="p-centered">
          "Not For Sale"</p>}
        <p className="" style={{textAlign: "center"}}>
          <Link 
            to={`/artworks/${artwork._id}`}>
            <img src={`./images/${artwork.picture}`} style={{width: "90%", padding: "5px", 
              border: "10px solid white"}}></img><br/>
              <span className="">[ More Detail Information ]</span>
          </Link>
        </p>
      </div>
      <h4 className="" style={{backgroundColor: "lightBlue", border: "10px solid lightyellow", paddingTop: "20px", 
        paddingBottom: "10px"}}>
        {showUsername ? (
          <Link
            className="textLight"
            to={`//${artwork.artist}`}>
            <p className="h5-centered">Artist: {artwork.artist}</p>
          </Link>
        ) : (
          <>
            <span style={{textAlign: "center", fontSize: "1rem"}}>
              You created this artwork during {artwork.artworkCreatedDate}.
            </span>
          </>
        )}
      </h4>
      <p className="" style={{backgroundColor: "tan", padding: "10px", marginTop: "-8px"}}>
        <span style={{textAlign: "center", fontSize: '1rem' }}>
          This artwork was created during {artwork.artworkCreatedDate}.
        </span>
      </p>
    </div>
    ))}
  </div>
</div>
);
};


export default ArtworkList;

