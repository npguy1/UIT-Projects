
// Get DOM elements
let btnSignOut = document.getElementById("btnSignOut");

let loggedInDiv = document.getElementById("loggedInDiv");



//Add SignOut Event
btnSignOut.addEventListener("click", e => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log("User signed out successfully");
      })
      .catch(function(error) {
        // An error happened.
      });
  });



//Add Realtime User listner
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      //console.log(user);
  
      // Adding user information
      getLoggedInUserName();
  
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
function getLoggedInUserName() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
  
 
    return (
      firebase
        .database()
        //Node level user and fetching record where node key = uid
        .ref("/user/" + uid)
        .once("value")
        .then(function(snapshot) {
          var loggedInUser = snapshot.val();
          var username = loggedInUser.uname;
  
          document.getElementById("userinfo").innerHTML = username;
        })
        .catch(function(error) {
          console.error("Error reading data from Realtime Database:", error);
        })
    );
  }