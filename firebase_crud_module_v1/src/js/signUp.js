
// Get DOM elements

let txtNewName = document.getElementById("txtNewName");
let txtNewEmail = document.getElementById("txtNewEmail");
let txtNewPassword = document.getElementById("txtNewPassword");

let linkSignIn = document.getElementById("linkSignIn");
let NewUserDiv = document.getElementById("NewUserDiv");

let btnSignUp = document.getElementById("btnSignUp");




//Add SignUp Event
btnSignUp.addEventListener("click", e => {
    var email = txtNewEmail.value;
    var password = txtNewPassword.value;
    var username = txtNewName.value;
    console.log(email + "---" + password + "---" + username);
    SignUp(email, password, username);
  });

  //SignIn Link Event
linkSignIn.addEventListener("click", e => {
    // Hide Sign Up form Div
    NewUserDiv.classList.add("hide");
  
    // Showing Sign In form
    loggedOutDiv.classList.remove("hide");
  });


  // Sign Up Function
function SignUp(email, password, username) {
    // TODO : Add email validation
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        addUser(username);
        console.log(res);
        console.log("User signed up successfully");
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
      //Node level user and asssing user auth uid as key of this record
      .ref("/user/" + uid)
      // .child(uid)
      .set({
        userId: uid,
        email: userEmail,
        uname: userName
      })
      .catch(function(error) {
        console.error("Error writing new user to Realtime Database:", error);
      });
  }