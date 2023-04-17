

import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleArtwork from "./pages/SingleArtwork";
//import SingleComment from "./pages/SingleComment";
import ContactForm from "./pages/ContactForm";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, {headers}) => {
  // Get the authentication token from local storage if it exists.
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route 
                path="/currentUser" 
                element={<Profile />}
              />
              <Route 
                path="/profiles/:username" 
                element={<Profile />}
              />
              <Route 
                path="/artworks/:artworkId" 
                element={<SingleArtwork />}
              />
              <Route 
                path="/contact" 
                element={<ContactForm />}
              />
              <Route 
                path="/contact/:formUsageMode" 
                element={<ContactForm />}
              />
            </Routes>
          </div>
          <br/>
          <br/>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;


// <Route 
// path="/thoughts/:thoughtId" 
// element={<SingleThought />}
// />

