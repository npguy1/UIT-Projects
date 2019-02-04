//Add error after input field funtion
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//Creating error div
var errorDiv = document.createElement("div");
errorDiv.className = "text-danger small";

// DOM Values for mandatory fields
var fullName = txtFullName.value;
var contactNumber = txtContactNumber.value;
var dob = txtDob.value;

//form validation funtion
function checkForm() {
  var alphabeticExpression = /^[a-zA-Z\s]+$/;

  // validation fails if the input is blank
  if (
    txtFullName.value.length < 3 ||
    !txtFullName.value.match(alphabeticExpression)
  ) {
    console.log("I am inn");
    txtFullName.focus();
    var errorMessage =
      "Name should be at least 3 characters and alphabets only ";
    errorDiv.innerHTML = errorMessage;
    insertAfter(txtFullName, errorDiv);
    return false;
  }

  // regular expression to match only alphanumeric characters and spaces
  var numericExpression = /^[0-9]+$/;

  // validation fails if the input doesn't match our regular expression
  if (
    txtContactNumber.value.length < 6 ||
    !txtContactNumber.value.match(numericExpression)
  ) {
    txtContactNumber.focus();
    var errorMessage = "Phone number should be at least 6 and numbers only";
    errorDiv.innerHTML = errorMessage;
    insertAfter(txtContactNumber, errorDiv);
    return false;
  }

  // checkEmpty(txtDob,"Valid date of birth is required");
  // validation fails if the input is blank
  if (txtDob.value == "") {
    txtDob.focus();
    var errorMessage = "Valid date of birth is required";
    errorDiv.innerHTML = errorMessage;
    insertAfter(txtDob, errorDiv);
    return false;
  }

  // validation was successful
  return true;
}








function checkEmpty(inputField, errorMessage) {
  if (inputField.value == "") {
    inputField.focus();
    //  errorMessage = "Valid date of birth is required";
    errorDiv.innerHTML = errorMessage;
    insertAfter(inputField, errorDiv);
    return false;
  }
}
