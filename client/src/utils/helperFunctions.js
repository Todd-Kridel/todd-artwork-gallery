

// function checkForValidInput(inputType, inputValue) {
//   switch(inputType) {
//     case "contact comment": 
//       if (inputValue.trim() != "") {
//         return 1;
//       }
//       else return 0;
//   }
// }


function validateNonBlank(inputValue) {
//alert("validateNonBlank processing");
if (inputValue.trim() != "") // && (inputValue.trim() != "...DEFAULT VALUE..."))
  {
  return 1;
  }
else 
  {
  return 0;
  }
}


function validateEmail(email) {
//alert("validateEmail processing");
const emailFormatRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return emailFormatRegularExpression.test(String(email).toLowerCase());
}
    

module.exports = {validateNonBlank, validateEmail};

