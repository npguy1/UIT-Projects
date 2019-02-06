// Get DOM elements
let txtEmail = document.getElementById("txtEmail");
let txtPassword = document.getElementById("txtPassword");
let loginError = document.getElementById("loginError");

let txtNewName = document.getElementById("txtNewName");
let txtNewEmail = document.getElementById("txtNewEmail");
let txtNewPassword = document.getElementById("txtNewPassword");

let linkSignIn = document.getElementById("linkSignIn");
let linkSignUp = document.getElementById("linkSignUp");

let signInForm = document.getElementById("signIn-form");
let signUpForm = document.getElementById("signUp-form");


//Add SignIn Event
linkSignUp.addEventListener("click", e => {
  signInForm.classList.add("hide");
  signUpForm.classList.remove("hide");  
 
});

linkSignIn.addEventListener("click", e => {
  signInForm.classList.remove("hide");
  signUpForm.classList.add("hide"); 
 });


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
