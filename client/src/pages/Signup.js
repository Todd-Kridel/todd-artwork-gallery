

import {React, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);


  // When a new page content section is rendered at after being selected by button/link click...then  
  // scroll the view of that new content to the top...for in case that a previous page has already 
  // been viewed/scrolled to a lower section of the page view space.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="" style={{color: "white", backgroundColor: "tan", padding: "50px"}}>
          <h4 className="p-centered" style={{color: "white", backgroundColor: "darkgray", padding: "10px", 
            marginBottom: "25px", border: "10px solid white"}}>
            Sign-Up Page
          </h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You can now go{" "}
                <Link to="/">
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <p>User Name: 
                <input
                  className="form-input"
                  placeholder="Enter your desired user name or alias for the system."
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}/></p>
                <br/>
                <p>Email Address:</p>
                <input
                  className="form-input"
                  placeholder="Enter your user-unique email address."
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}/>
                <br/>
                <p>Password: Create-Enter a desired password that is at least 8 characters in length.</p>
                <input
                  className="form-input"
                  placeholder="********"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}/>
                <br/>
                <p style={{textAlign: "center", marginBottom: "-25px"}}>
                  <button className="buttonHighlight" style={{cursor: "pointer"}}
                    type="submit">
                    Submit the Entered Sign-Up Information
                  </button>
                </p>
              </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};


export default Signup;

