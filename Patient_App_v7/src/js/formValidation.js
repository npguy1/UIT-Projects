

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var errorDiv = document.createElement("div");
errorDiv.className = "text-danger small";


// DOM Values 
var fullName = txtFullName.value;
var contactNumber = txtContactNumber.value;
var dob = txtDob.value;


function checkForm()
  {
   
    var alphabeticExpression = /^[a-zA-Z\s]+$/;

    // validation fails if the input is blank
    if(txtFullName.value.length < 3 || !(txtFullName.value.match(alphabeticExpression))) {
      console.log("I am inn")
      txtFullName.focus();
      var errorMessage = "Name should be at least 3 characters and alphabets only ";
      errorDiv.innerHTML = errorMessage;
      insertAfter(txtFullName, errorDiv);
      return false;
    }


    // regular expression to match only alphanumeric characters and spaces
    var numericExpression = /^[0-9]+$/;

    // validation fails if the input doesn't match our regular expression
    if( txtContactNumber.value.length < 6 || !(txtContactNumber.value.match(numericExpression))) {
      txtContactNumber.focus();
      var errorMessage = "Phone number should be at least 6 and numbers only";
      errorDiv.innerHTML = errorMessage;
      insertAfter(txtContactNumber, errorDiv);
      return false;
    }

   // checkEmpty(txtDob,"Valid date of birth is required");
     // validation fails if the input is blank
     if(txtDob.value == "") {
      txtDob.focus();
      var errorMessage = "Valid date of birth is required";
      errorDiv.innerHTML = errorMessage;
      insertAfter(txtDob, errorDiv);
      return false;
    }
    


    // validation was successful
    return true;
  }


  function checkEmpty(inputField,errorMessage){

    if(inputField.value == "") {
      inputField.focus();
    //  errorMessage = "Valid date of birth is required";
      errorDiv.innerHTML = errorMessage;
      insertAfter(inputField, errorDiv);
      return false;
    }

  }


// fullName==null || fullName=="",contactNumber==null || contactNumber=="",dob==null || dob==""

/* function formValidation() {

  // To check empty form fields.
  if (fullName=="" || contactNumber=="" || dob=="")
  {

  console.log("Please Fill All Required Field");
      return false;
  } else {
    return true;
  }
  
 } */


    








 



/* 
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
 */