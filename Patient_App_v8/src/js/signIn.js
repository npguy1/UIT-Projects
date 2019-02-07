// Get DOM elements
let txtEmail = document.getElementById("txtEmail");
let txtPassword = document.getElementById("txtPassword");
let loginError = document.getElementById("loginError");

let btnSignIn = document.getElementById("btnSignIn");


let txtNewName = document.getElementById("txtNewName");
let txtNewEmail = document.getElementById("txtNewEmail");
let txtNewPassword = document.getElementById("txtNewPassword");
let signupError = document.getElementById("signupError");

let btnSignUp = document.getElementById("btnSignUp");


let linkSignIn = document.getElementById("linkSignIn");
let linkSignUp = document.getElementById("linkSignUp");

let signInForm = document.getElementById("signIn-form");
let signUpForm = document.getElementById("signUp-form");


//SignUp Link Event
linkSignUp.addEventListener("click", e => {
  signInForm.classList.add("hide");
  signUpForm.classList.remove("hide");  
 
});

//SignIn Link Event
linkSignIn.addEventListener("click", e => {
  signInForm.classList.remove("hide");
  signUpForm.classList.add("hide"); 
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
      //loginError.innerHTML = "Wrong username or password.";
      var errorMessage = error.message;
      console.log(email + "---" + password);
      console.log(errorMessage);
      loginError.innerHTML = errorMessage;

      // ...
    });
}


//Add SignUp Button Event
btnSignIn.addEventListener("click", e => {
  var email = txtEmail.value;
  var password = txtPassword.value;

  SignIn(email, password);
  
  
  
});





//Add SignUp Button Event
btnSignUp.addEventListener("click", e => {
  var name = txtNewName.value;
  var email = txtNewEmail.value;
  var password = txtNewPassword.value;
  
  var alphabeticExpression = /^[a-zA-Z\s]+$/;


    // validation fails if the input is blank
    if (
      txtNewName.value.length < 3 ||
      !txtNewName.value.match(alphabeticExpression)
    ) {
      
      txtNewName.focus();
      var errorMessage =
        "Name should be alphabets only and at least 3 characters or more ";
      signupError.innerHTML = errorMessage;
      } else {

        console.log(name +" == "+ email +" == "+ password);

        SignUp(name, email, password);

      }
  
});



  // Sign Up Function
  function SignUp(name, email, password) {
    // TODO : Add email validation
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        //add user info in db
        addUser(name);
        console.log(res);
        console.log(name +" == ");
        console.log("User signed up successfully");
      })
      .catch(function(error) {
       
       // Handle Errors here.
       
       var errorMessage = error.message;
        var errorMessage = error.message;
        console.log(email + "---" + password + "---" + name);
        console.log(errorMessage);
        signupError.innerHTML = errorMessage;
  
        // ...
      });
  }

  //Add user info in database
function addUser(userName) {
  //getting logged in user info from auth
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var userEmail = user.email;
    firebase
      .database()
      //Node level user and asssing user auth uid as key of this record
      .ref("/user/" + uid)
      // Setting key of data base from auth user
      .set({
        userId: uid,
        email: userEmail,
        uname: userName
      })
      .then(res => {
        // opening landing page after sign up
        txtNewName.value = "";
        txtNewEmail.value = "";
        txtNewPassword.value = "";
        location.href = "landing.html";

      })
      .catch(function(error) {
        console.error("Error writing new user to Realtime Database:", error);
      });
  }



function signUpValidation(){

  var alphabeticExpression = /^[a-zA-Z\s]+$/;

  // validation fails if the input is blank
  if (
    txtNewName.value.length < 3 ||
    !txtNewName.value.match(alphabeticExpression)
  ) {
    console.log("I am inn");
    txtNewName.focus();
    var errorMessage =
      "Name should be at least 3 characters and alphabets only ";
    signupError.innerHTML = errorMessage;
    return false;
  }


}


// Converting String into Title Case for Name
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}