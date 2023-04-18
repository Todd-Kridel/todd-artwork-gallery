

import React from "react";
import {useQuery} from "@apollo/client";


import ArtworkList from "../components/ArtworkList";
//import ViewerCommentForm from "../components/ViewerCommentForm";

import {QUERY_ARTWORKS} from "../utils/queries";


function BackToTopButton() {
  function scrollWindowToTop() {
    window.scrollTo(0,0);
  }
return (
//<BackToTopButton />
<div style={{position: "fixed", top: "90%", zIndex: "100"}}>
  <button style={{borderRadius: "8px"}} onClick={scrollWindowToTop}>Back to Top</button>
</div>
)
}


const Home = () => {
  const { loading, data } = useQuery(QUERY_ARTWORKS);
  const artworks = data?.artworks || [];
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];
  return (
    <main id="BodyContentContainer">
      <div>
        <div className="p-centered" style={{margin: "0px", padding: "0px"}}>
          {loading ? (
            <div>Loading...</div>
          ) : (  
            <ArtworkList
              artworks={artworks}
              title="Take a look at the current gallery of appealing artistic creations...both artworks 
                that I have created and other-artist artworks that I have liked at galleries and art 
                shows. Also...TBD...this website contains artworks posts of other admired artists user 
                members/friends of my gallery webpage."/>
          )} 
        </div>
        <BackToTopButton />
      </div>
    </main>
  );
};


export default Home;

