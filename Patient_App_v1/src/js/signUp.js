
// Get DOM elements

let txtFullName = document.getElementById("txtFullName");
let txtContactNumber = document.getElementById("txtContactNumber");
let txtEmergencyNumber = document.getElementById("txtEmergencyNumber");

let txtDob = document.getElementById("txtDob");
let txtGender = document.getElementsByName("txtGender");
let txtMaritalStatus = document.getElementsByName("txtMaritalStatus");
let txtCity = document.getElementById("txtCity");
let txtAddress = document.getElementById("txtAddress");
let txtPersonHeight = document.getElementById("txtPersonHeight");
let txtPersonWeight = document.getElementById("txtPersonWeight");
let txtMedicalCondition = document.getElementById("txtMedicalCondition");

let btnAddPatient = document.getElementById("btnAddPatient");




//Add SignUp Event
btnAddPatient.addEventListener("click", e => {
    var fullname = txtFullName.value;
    var contactnumber = txtContactNumber.value;
    var emergencynumber = txtEmergencyNumber.value;
    var dob = txtDob.value;
   // var gender = txtGender.value;
    var maritalstatus = txtMaritalStatus.value;

    for (var i = 0; i < txtGender.length; i++) {
      if (txtGender[i].checked) {
        var gender =  txtGender[i].value;
      }
  }

  
  for (var i = 0; i < txtMaritalStatus.length; i++) {
    if (txtMaritalStatus[i].checked) {
      var maritalstatus =  txtMaritalStatus[i].value;
    }
}

/* 
    if (document.getElementsByName('gender').checked) {
      var gender = txtGender.value;;
    }
    if (document.getElementsByName('txtMaritalStatus').checked) {
      var maritalstatus = txtMaritalStatus.value;
    } */
    var city = txtCity.value;
    var address = txtAddress.value;
    var personheight = txtPersonHeight.value;
    var personweight = txtPersonWeight.value;
    var medicalcondition = txtMedicalCondition.value;


    console.log(fullname + "-" + contactnumber + "-" + emergencynumber + "-" + dob + "-" + gender + "-" + maritalstatus + "-" + city + "-" + address + "-" + personheight + "-" + personweight + "-" + medicalcondition);
    addPatient(fullname,contactnumber,emergencynumber,dob,gender,maritalstatus,city,address,personheight,personweight,medicalcondition);
    



  });

/*   //SignIn Link Event
linkSignIn.addEventListener("click", e => {
    // Hide Sign Up form Div
    NewUserDiv.classList.add("hide");
  
    // Showing Sign In form
    loggedOutDiv.classList.remove("hide");
  });

 */
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
function addPatient(fullname,contactnumber,emergencynumber,dob,gender,maritalstatus,city,address,personheight,personweight,medicalcondition) {
    
    firebase
      .database()
      //Node level user and asssing user auth uid as key of this record
      .ref("patient/")
      // .child(uid)
      .set({
        fullname: fullname,
        contactnumber: contactnumber,
        emergencynumber: emergencynumber,
        dob: dob,
        gender: gender,
        maritalstatus: maritalstatus,
        city: city,
        address: address,
        personheight: personheight,
        personweight: personweight,
        medicalcondition: medicalcondition


      })
      .catch(function(error) {
        console.error("Error writing new user to Realtime Database:", error);
      });
  }