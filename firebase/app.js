// Initialize Firebase
var config = {
  apiKey: "AIzaSyCeRG8L1WeTZcu0nfk6o_lhjtqFXuxkPxQ",
  authDomain: "uit-sample-3b935.firebaseapp.com",
  databaseURL: "https://uit-sample-3b935.firebaseio.com",
  projectId: "uit-sample-3b935",
  storageBucket: "uit-sample-3b935.appspot.com",
  messagingSenderId: "148212352570"
};
firebase.initializeApp(config);

// Get DOM elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");

const txtNewName = document.getElementById("txtNewName");
const txtNewEmail = document.getElementById("txtNewEmail");
const txtNewPassword = document.getElementById("txtNewPassword");

const btnSignIn = document.getElementById("btnSignIn");
const btnSignUp = document.getElementById("btnSignUp");
const btnSignOut = document.getElementById("btnSignOut");
const linkSignIn = document.getElementById("linkSignIn");
const linkSignUp = document.getElementById("linkSignUp");
const loggedOutDiv = document.getElementById("loggedOutDiv");
const NewUserDiv = document.getElementById("NewUserDiv");
const loggedInDiv = document.getElementById("loggedInDiv");

//Add SignIn Event
btnSignIn.addEventListener("click", e => {
  var email = txtEmail.value;
  var password = txtPassword.value;
  SignIn(email, password);
  console.log(email + "---" + password);
});

//Add SignUp Event
btnSignUp.addEventListener("click", e => {
  var email = txtNewEmail.value;
  var password = txtNewPassword.value;
  var username = txtNewName.value;
  console.log(email + "---" + password + "---" + username);
  SignUp(email, password, username);
});

//Add SignOut Event
btnSignOut.addEventListener("click", e => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      alert("User signed out successfully");
    })
    .catch(function(error) {
      // An error happened.
    });
});

//SignUp Link Event
linkSignUp.addEventListener("click", cb => {
  // Hiding Sign In form
  loggedOutDiv.classList.add("hide");

  // Showing Sign Up form Div
  NewUserDiv.classList.remove("hide");
});

//SignIn Link Event
linkSignIn.addEventListener("click", cb => {
  // Hide Sign Up form Div
  NewUserDiv.classList.add("hide");

  // Showing Sign In form
  loggedOutDiv.classList.remove("hide");
});

// Sign In Function
function SignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      alert("User signed in successfully");
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

// Sign Up Function
function SignUp(email, password, username) {
  // TODO : Add email validation

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      addUser(username);
      console.log(res);
      alert("User signed up successfully");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(email + "---" + password + "---" + username);
      console.log(errorMessage);

      // ...
    });
}

//Add user info in database
function addUser(userName) {
  var user = firebase.auth().currentUser;
  var uid = user.uid;
  var userEmail = user.email;
  firebase
    .database()
    .ref()
    .child("user")
    .child(uid)
    .set({
      userId: uid,
      email: userEmail,
      uname: userName
    });
}

//Add Realtime User listner
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    //console.log(user);

    // Adding user information
    getUser();
 

    // Hiding Sign In form
    loggedOutDiv.classList.add("hide");

    // Showing Logged In Div
    loggedInDiv.classList.remove("hide");
  } else {
    // No user is signed in.
    console.log("User not signed in");

    // Showing Sign In
    loggedOutDiv.classList.remove("hide");

    // Hiding Logged In Div
    loggedInDiv.classList.add("hide");
  }
});

// Get individual user name by uid 
function getUser() {
  var user = firebase.auth().currentUser;
  return firebase
    .database()
    .ref("user")
    .once("value")
    .then(function(snapshot) {
      var allUsers = snapshot.val();
      var username = allUsers[user.uid].uname;

      document.getElementById("userinfo").innerHTML =  username;

     
      // ...
    });
    
}
