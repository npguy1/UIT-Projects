

//Add SignIn Event
btnSignIn.addEventListener("click", e => {
  var email = txtEmail.value;
  var password = txtPassword.value;
  SignIn(email, password);
  console.log(email + "---" + password);
});

//SignUp Link Event
linkSignUp.addEventListener("click", e => {
  // Hiding Sign In form
  loggedOutDiv.classList.add("hide");

  // Showing Sign Up form Div
  NewUserDiv.classList.remove("hide");
});

// Sign In Function
function SignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      console.log("User signed in successfully");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(email + "---" + password);
      console.log(errorMessage);

      // ...
    });
}
