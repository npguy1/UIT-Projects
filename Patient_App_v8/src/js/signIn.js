// Get DOM elements
let txtEmail = document.getElementById("txtEmail");
let txtPassword = document.getElementById("txtPassword");
let loginError = document.getElementById("loginError");

let btnSignIn = document.getElementById("btnSignIn");

//Add SignIn Event
btnSignIn.addEventListener("click", e => {
  var email = txtEmail.value;
  var password = txtPassword.value;
  SignIn(email, password);
  // console.log(email + "---" + password);
});

// Sign In Function
function SignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      console.log("User signed in successfully");
      location.href = "landing.html";
    })
    .catch(function(error) {
      // Handle Errors here.
      loginError.innerHTML = "Wrong username or password.";
      var errorMessage = error.message;
      console.log(email + "---" + password);
      console.log(errorMessage);

      // ...
    });
}
