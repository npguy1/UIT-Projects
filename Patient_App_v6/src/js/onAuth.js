


window.onload = function() {
  //Add Realtime User listner
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // User is signed in.
 
    // Adding user information
   

  //window.open("index.html");
  location.href = "index.html";


  } else {
    getLoggedInUserName();

    

  }
});
};

 
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

        document.getElementById("userinfo").innerHTML = "Welcome " +username;
      })
      .catch(function(error) {
        console.error("Error reading data from Realtime Database:", error);
      })
  );
}



 //Add SignOut Event
 linkSignOut.addEventListener("click", e => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      console.log("User signed out successfully");
      location.href = "index.html";
    })
    .catch(function(error) {
      // An error happened.
    });
});