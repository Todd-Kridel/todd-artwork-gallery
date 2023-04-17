

import {React} from "react";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {validateNonBlank, validateEmail} from "../utils/helperFunctions";
  // a helper function that checks about if the format of an entered email address is valid


function ContactForm() {


// Create state variables for the fields in the form; setting initial values to a blank string.
const [email, setEmail] = useState("");
const [userName, setUserName] = useState("");
const [comment, setComment] = useState("");
const [statusMessage, setStatusMessage] = useState("NONE/IDLE");
const [userNameGoodStatus, setUserNameGoodStatus] = useState(false);
const [emailGoodStatus, setEmailGoodStatus] = useState(false);
const [commentGoodStatus, setCommentGoodStatus] = useState(false);
const [submitStatus, setSubmitStatus] = useState("NOT_READY");
let the1stUsageAttemptIsOccurring = true;
let submitProcessingIsOccurring = false;  // to skip extra non-necessary on-update validation processing
// Use "useParams()" to retrieve the value of the route parameter ":mode" if applicable (a purchase request message).
let {formUsageMode} = useParams();
//window.alert(formUsageMode + "; " + the1stUsageAttemptIsOccurring);
let localStorageArtworkInformation = "";
if ((formUsageMode == "purchase_request") && (localStorage.getItem("TKAG_artwork_purchase_information") != ""))
{
  // LocalStorage:
  // LOADING: var variable_name = JSON.parse(localStorage.getItem("name_of_key"));
  //window.alert(formUsageMode + ";  START OF MESSAGE PROCESSING");
  localStorageArtworkInformation = localStorage.getItem("TKAG_artwork_purchase_information");
  localStorageArtworkInformation = (localStorageArtworkInformation.replaceAll("\"", "")).trim();
  //window.alert(localStorageArtworkInformation);
  //let windowURLProcessing = (window.location).replace("purchase_request", "");
  //window.location.replace(windowURLProcessing);
}


// default per-element-usage processing that is necessary (at only 1 time)

// When a new page content section is rendered at after being selected by button/link click...then  
// scroll the view of that new content to the top...for in case that a previous page has already 
// been viewed/scrolled to a lower section of the page view space.;
useEffect(() => {
  window.scrollTo(0, 0);
  //
  if (the1stUsageAttemptIsOccurring)
  {
    //alert("Use the Contact form to send a question or a comment to me.");
    //document.getElementById("theContactFormUserName").value = "...DEFAULT VALUE...";
    //document.getElementById("theContactFormEmailAddress").value = "...DEFAULT VALUE...";
    //document.getElementById("theContactFormComment").value = "...DEFAULT VALUE...";
    document.getElementById("statusMessageDisplayField").value = statusMessage;
    //window.alert("useEffect processing");
    if ((formUsageMode == "purchase_request") && (localStorage.getItem("TKAG_artwork_purchase_information") != ""))
      {
        //window.alert("useEffect localStorage: " + localStorageArtworkInformation);
        localStorageArtworkInformation = localStorageArtworkInformation.replaceAll("<br/>", "\n");
        document.getElementById("theContactFormComment").value = localStorageArtworkInformation;
        localStorage.setItem("TKAG_artwork_purchase_information", "");
        //window.alert("useEffect localStorage: " + localStorageArtworkInformation);
      }
    else if (formUsageMode != "purchase_request")  // && (localStorage.getItem("TKAG_artwork_purchase_information") != "")
      {
        document.getElementById("theContactFormComment").value = "(required field; at least 1 character (preferably at least 1 word))";
      }
    the1stUsageAttemptIsOccurring = false;
  }
}, []);


// default per-element-usage processing that is necessary (at more than 1 time)
useEffect(() => {
  {
  document.getElementById("statusMessageDisplayField").value = statusMessage;
  document.getElementById("statusCodeDisplayField").value = submitStatus;
  //console.log ("EFFECT validation statuses (U, E, C): " + userNameGoodStatus + ", " + emailGoodStatus + ", " + 
  //  commentGoodStatus);
  //window.alert(the1stUsageAttemptIsOccurring + "; additional useEffect");
  }
});


const handleInputOnChangeEvent = (e) => { 
formUsageMode = "";
//alert("UPDATE PROCESSING");
//console.log(e);
// to get the name and the value entry of the input field that triggered the change/update event
const {target} = e;
const inputType = target.name;
const inputValue = target.value;
//
if (statusMessage == "Thanks about contacting me about your question or/and comment.") 
  {
  setStatusMessage("NONE/IDLE");  // a reset for the 1st input at after a current-session submission
  document.getElementById("theContactFormUserName").value = "";
  document.getElementById("theContactFormEmailAddress").value = "";
  document.getElementById("theContactFormComment").value = "";
  }
//console.log("inputType: " + inputType + "; inputValue: " + inputValue);
//
// Based on the input type...validate the input data values and then assign the corresponding state value 
// of the user name, email address, or comment if the value is valid; otherwise...display an error message 
// and then assign a corresponding informative status to allow for the user to correct the information.
//
// a validation setStatusMessage: "The entered Contact form information is not valid (such as a blank 
// field or a non-valid email address format)."
//
//if (!submitProcessingIsOccurring) 
//{
//
if (inputType === "userName")
  {
  if (validateNonBlank(inputValue)) 
    {
    setUserName(inputValue);
    setUserNameGoodStatus(true);
    setStatusMessage("The entered user name information is valid.");
    console.log("userName content validation: true good status");
    determineOverallFieldStatus();
    }
    else
    {
    // ERROR
    setUserName("");
    setUserNameGoodStatus(false);
    setStatusMessage("The entered user name information is not valid; it cannot be blank.");
    console.log("userName content validation: false good status");
    determineOverallFieldStatus();
    }
  }
else if (inputType === "email") 
  {
  if (validateNonBlank(inputValue)) 
    {
    setStatusMessage("The entered email information is valid non-blank-wise.");
    console.log("email content validation: true good status");
    if (validateEmail(inputValue)) 
      {
      setEmail(inputValue);
      setEmailGoodStatus(true);
      setStatusMessage("The entered email information is valid (non-blank-wise and format-wise).");
      console.log("email format validation: true good status");
      determineOverallFieldStatus();
      } 
    else 
      {
      // ERROR
      setEmail("");
      setEmailGoodStatus(false);
      setStatusMessage("The entered email address format is not valid; missing '@', provider, or/and '.com'.");
      console.log("email format validation: false good status");
      determineOverallFieldStatus();
      }
    }
  else 
    {
    // ERROR
    setEmail("");
    setEmailGoodStatus(false);
    setStatusMessage("The entered email address information is not valid; it cannot be blank.");
    console.log("email content validation: false good status");
    determineOverallFieldStatus();
    }
  }
else if (inputType === "comment") 
  {
  if (validateNonBlank(inputValue)) 
    {
    setComment(inputValue);
    setCommentGoodStatus(true);
    setStatusMessage("The entered comment information is valid.");
    console.log("comment content validation: true good status");
    determineOverallFieldStatus();
    }
  else 
    {
    // ERROR
    setComment("");
    setCommentGoodStatus(false);
    setStatusMessage("The entered comment information is not valid; it cannot be blank.");
    console.log("comment content validation: false good status");
    determineOverallFieldStatus();
    }
  }
//} // END: if (!submitProcessingIsOccurring)
//
// Determine about the current overall good/ready status with regard to all 3 validation fields for usage 
// for successful submission capability.
function determineOverallFieldStatus() {
//console.log ("1st validation statuses (U, E, C): " + userNameGoodStatus + ", " + emailGoodStatus + ", " + 
//  commentGoodStatus);
if (userNameGoodStatus && emailGoodStatus && commentGoodStatus) 
  {
  setSubmitStatus("GOOD_READY");
  console.log("submitStatus: GOOD_READY");
  //alert("submitStatus: GOOD_READY");
  }
else
  {
  setSubmitStatus("NOT_READY");
  console.log("submitStatus: NOT_READY");
  //alert("submitStatus: NOT_READY");
  }
document.getElementById("statusCodeDisplayField").value = submitStatus;
//console.log ("2nd validation statuses (U, E, C): " + userNameGoodStatus + ", " + emailGoodStatus + ", " + 
//  commentGoodStatus);
}
} // END: handleInputOnChangeEvent  


function handleInputOnBlurEvent(e) {
// to get the name and the value entry of the input field that triggered the change/update event
const {target} = e;
const inputType = target.name;
const inputValue = target.value;
if (inputValue.trim() == "") 
  {
  document.getElementById("statusMessageDisplayField").value = 
    ">>>> FYI: The just-exited entry field (" + inputType + ") requires an entry value for a submission. <<<<";
  }
handleInputOnChangeEvent(e);
}  // END: handleInputOnBlurEvent


const handleFormSubmit = (e) => {
//alert("SUBMIT PROCESSING");
//
// to prevent the default behavior of the form submit (which is to refresh the page)
e.preventDefault();
// Check about if the format of the entered user name or email address or comment is value...
// i.e,. non-blank and of the correct format (if applicable; such as for email address). If the 
// entered information is valid...then submit the information for Contact process; otherwise 
// display an error message.
//console.log(statusMessage);
//
document.getElementById("theContactFormUserName").value = 
  (document.getElementById("theContactFormUserName").value).trim();
document.getElementById("theContactFormEmailAddress").value = 
  document.getElementById("theContactFormEmailAddress").value.trim();
document.getElementById("theContactFormComment").value = 
  document.getElementById("theContactFormComment").value.trim();
//
if ((submitStatus == "GOOD_READY") || (userNameGoodStatus && emailGoodStatus && commentGoodStatus))
  {
  submitProcessingIsOccurring = true;  // to skip extra non-necessary on-update validation processing
  let submissionMessageToTodd = {"from": userName, "emailAddress": email, "comment": comment};
  alert("SUBMISSION INFORMATION FOR SENDING: " + "\n\n" + JSON.stringify(submissionMessageToTodd));
  // If the form input information is valid...then clear the input fields and the state variable 
  // values.
  document.getElementById("theContactFormUserName").value = ">> SUBMITTED <<";
  document.getElementById("theContactFormEmailAddress").value = ">> SUBMITTED <<";
  document.getElementById("theContactFormComment").value = ">> SUBMITTED <<";
  setUserName("");
  setEmail("");
  setComment("");
  setStatusMessage("Thanks about contacting me about your question or/and comment.");
  the1stUsageAttemptIsOccurring = true;
  setUserNameGoodStatus(false);
  setEmailGoodStatus(false);
  setCommentGoodStatus(false);
  setSubmitStatus("NOT_READY");
  document.getElementById("statusCodeDisplayField").value = "NOT_READY";
  }
else
  {
  setStatusMessage("Enter/Correct all of the field information in the form.");
  // Exit out of this function if the entered data is not valid (in whole); exit to allow for the 
  // user to correct the information.
  return;
  }
}


return (
<div>

  <br/>
  <br/>
  <br/>
  <br/>
  <div style={{border: "10px solid tan", backgroundColor: "tan", textAlign: "center", padding: "10px"}}>
  <br/>
  <br/>
  <div style={{border: "10px solid lightyellow", backgroundColor: "lightblue", textAlign: "center", padding: "10px", 
    marginLeft: "50px", marginRight: "50px"}}>
    <h1>Contact Todd Form</h1>
  </div>

  <br/>

  <p className = "pCenter">
    Use the Contact form at below to send a question or/and a comment to me. I will return a response 
    message to you at as soon as possible.<br/>
    <br/>
    ++ FUTURE ADDITIONAL CONTACT PAGE INFORMATION ++
  </p>

  <br/>

  <form className="theContactForm">
  <p className="pCenter"><span style={{textDecoration: "underline"}}>From:</span></p>

  <p className="pCenter">
    <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center"}}>
      <div><label for="theContactFormUserName">Name:</label>&nbsp;&nbsp;<input
        id="theContactFormUserName" 
        className="contactFormInputField"
        //value=
        name="userName"
        onChange={handleInputOnChangeEvent}
        onBlur={handleInputOnBlurEvent}
        onKeyUp={handleInputOnChangeEvent}
        type = "text"
        placeholder="(at least a first/alias name)"
      /></div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <div><label for="theContactFormEmailAddress">Email&nbsp;Address:</label>&nbsp;&nbsp;<input
        id="theContactFormEmailAddress" 
        className="contactFormInputField"
        //value=
        name="email"
        onChange={handleInputOnChangeEvent}
        onBlur={handleInputOnBlurEvent}
        onKeyUp={handleInputOnChangeEvent}
        type="email"
        placeholder="example: 'user@email.com'"
      /></div>
    </div>
  </p>
  <p className="pCenter">Comment:<br/>
    <textarea className="contactComment"
      id="theContactFormComment" 
      //value={(formUsageMode == "purchase_request") ? localStorageArtworkInformation : null}
      name="comment"
      onChange={handleInputOnChangeEvent}
      onBlur={handleInputOnBlurEvent}
      onKeyUp={handleInputOnChangeEvent}
      type="textarea"
      placeholder="(required field; at least 1 character (preferably at least 1 word))"
    ></textarea>
  </p>
  <p className = "pCenter">Current-Operation Status Message:<br/>
    <input id="statusMessageDisplayField" className="contactFormStatusText" readOnly="true" 
      style={{width: "90%"}}>
    </input>
  </p>
  <p className="pCenter">
    <button type="button" onClick={handleFormSubmit} 
      style={{border: "10px double purple", borderRadius: "5px", padding: "5px", fontSize: "20px"}}>
      &nbsp;&nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;&nbsp;
    </button>
  </p>
  <p className = "pCenter">Overall Status Code:<br/>
    <input id="statusCodeDisplayField" className="contactFormStatusCode" readOnly="true" 
      style={{width: "150px", textAlign: "center"}}>
    </input><br/>
    Note: If the overall status does not indicate as being "GOOD/READY" when valid data seems to be 
      entered in all of the fields...then click in and then out of each of the 3 fields at 1 more 
      time to re-trigger the field validation process.
  </p>
  </form>
  <br/>
  <br/>

  </div>
  <br/>
  <br/>

</div>
);
}
 

export default ContactForm;

