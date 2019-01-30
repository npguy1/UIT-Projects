

 function checkLogin(){

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

 }


