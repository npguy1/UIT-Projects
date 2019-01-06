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
      console.log("User signed out successfully");
    })
    .catch(function(error) {
      // An error happened.
    });
});

//SignUp Link Event
linkSignUp.addEventListener("click", e => {
  // Hiding Sign In form
  loggedOutDiv.classList.add("hide");

  // Showing Sign Up form Div
  NewUserDiv.classList.remove("hide");
});

//SignIn Link Event
linkSignIn.addEventListener("click", e => {
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
      console.log("User signed in successfully");
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
    .ref('/user/' + uid)
   // .child(uid)
    .set({
      userId: uid,
      email: userEmail,
      uname: userName
    })
    .catch(function(error) {
      console.error('Error writing new user to Realtime Database:', error);
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
  var uid = user.uid;
  
/*   var userRef = firebase.database().ref('/user/' + uid);
      userRef.on('value', function(snapshot) {

      var loggedInUser = snapshot.val();
      var username = loggedInUser.uname;

      document.getElementById("userinfo").innerHTML =  username;
}); */
  
  return firebase
    .database()
    //Node level user and fetching record where node key = uid
    .ref('/user/' + uid)
    .once("value")
    .then(function(snapshot) {
      var loggedInUser = snapshot.val();
      var username = loggedInUser.uname;

      document.getElementById("userinfo").innerHTML =  username;
    
    })
    .catch(function(error) {
      console.error('Error reading data from Realtime Database:', error);
    }); 
    
}

getUserList();

// Get all users 
function getUserList() {

  var columnLenght = 3;

  return firebase
    .database()
    //Node level user 
    .ref('/user/')
    .once("value")
    .then(function(snapshot) {

    
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        console.log(childKey +" "+ childData.uname + " " +childData.email);

        //creating table row 
        var tr = document.createElement("tr");
        
        //Loop within user node extracting each celldata row by row
        for (var cellData in childSnapshot.val()) { 
          
        //creating table td
        var td = document.createElement("td");

        //Putting celldata in td one by one  
        td.appendChild(document.createTextNode(childSnapshot.val()[cellData]))
        tr.appendChild(td);
        }

        var td = document.createElement("td");
        var btn = document.createElement("BUTTON");
        var btnTxt = document.createTextNode("Delete");
        btn.className = "btnDelete";
        btn.id = childKey ;
       // btn.onclick = dynamicEvent; // Attach the event!

        /* var delBtn = document.getElementById(childKey);
        delBtn.addEventListener("click", deleteUser); */
        //document.getElementById(btn.id).addEventListener("click", deleteUser);
        
        btn.appendChild(btnTxt);
        td.appendChild(btn);
        tr.appendChild(td);
      
      //Adding rows to table by id
      var table = document.getElementById("dataListTable");
      //table.innerHTML = "";
      table.appendChild(tr);
    
    
      });

    })
    .catch(function(error) {
      console.error('Error reading data from Realtime Database:', error);
    });
    
}


// Get the element, add a click listener...
document.getElementById("dataListTable").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a butten item with btnDelete class
	if(e.target && e.target.className == "btnDelete") {
    // Button item found!  Output the ID!
   
    console.log("Button item ", e.target.id.replace("post-", ""), " was clicked!");

  /*   var selectedUser = e.target.id;

    var admin = require('firebase-admin');

    admin.auth().deleteUser(selectedUser)
  .then(function() {
    console.log("Successfully deleted user");
  })
  .catch(function(error) {
    console.log("Error deleting user:", error);
  });
 */


/*     var user = firebase.auth().delete(selectedUser)
    user.delete().then(function() {
      // User deleted.
      console.log("user deleted succesfully");
    }).catch(function(error) {
      // An error happened.
      console.log("Fail to delete user");
    });
     */
  
 

    // Deleting User from real time databse 
    return firebase
    .database()
    //Node level user and fetching record where nodesl
    .ref('/user/' + selectedUser  )
    .ref.remove();
    //Remove user where by user id
  


	}
});


