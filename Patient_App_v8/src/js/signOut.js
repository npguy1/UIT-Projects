//get DOM element 
let linkSignOut = document.getElementById("linkSignOut");

function signOut() {
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
}
