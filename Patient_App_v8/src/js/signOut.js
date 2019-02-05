//get DOM element 
let linkSignOut = document.getElementById("linkSignOut");

function signOut() {
  
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

}

//Add SignOut Event
linkSignOut.addEventListener("click", e => {

  signOut();
 
});