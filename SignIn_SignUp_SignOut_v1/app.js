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
      const txtEmail = document.getElementById('txtEmail').value;
      const txtPassword = document.getElementById('txtPassword').value;
      const btnSignIn = document.getElementById('btnSignIn');
      const btnSignUp = document.getElementById('btnSignUp');
      const btnSignOut = document.getElementById('btnSignOut');
      const loggedOutDiv = document.getElementById('loggedOutDiv');
      const loggedInDiv = document.getElementById('loggedInDiv');

     

      //Add SignIn Event
      btnSignIn.addEventListener('click', cb =>{

          
        SignIn(txtEmail,txtPassword);

      })

      //Add SignUp Event
      btnSignUp.addEventListener('click', cb =>{

        console.log(txtEmail + "---" +  txtPassword);

          
        SignUp(txtEmail,txtPassword);

      })


       //Add SignOut Event
       btnSignOut.addEventListener('click', cb =>{

        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          alert("User signed out successfully")
        }).catch(function(error) {
          // An error happened.
        });

      })



      // Sign In Function 
     function SignIn(email,password) {


        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res=>{
            console.log(res);
            alert("User signed in successfully")
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ...
        });
        
        
        } 


        // Sign Up Function 
        function SignUp(email,password) {

          // TODO : Add email validation 

          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(res=>{
              addUser();
              console.log(res);
              alert("User signed up successfully")
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
          });
          
          
          } 

          //Add user info in database
         function addUser(){

          var user = firebase.auth().currentUser;
          var uid = user.uid;
          var userEmail = user.email;
          firebase.database().ref().child('user').child(uid).set({
          userId: uid,
          email: userEmail
          })
          }

          //Add Realtime User listner 
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              // User is signed in.
              console.log(user);
              
              // Adding user information 
              var user = firebase.auth().currentUser;
              var name, email, photoUrl, uid, emailVerified;

              document.getElementById("userinfo").innerHTML = user.email + "    " +user.uid;

              // Hiding Sign In form 
              loggedOutDiv.classList.add('hide')
              
              // Showing Logged In Div 
              loggedInDiv.classList.remove('hide')

            } else {
              // No user is signed in.
              console.log("User not signed in");

              // Showing Sign In
              loggedOutDiv.classList.remove('hide')

              // Hiding Logged In Div 
              loggedInDiv.classList.add('hide')
            }
          });
          