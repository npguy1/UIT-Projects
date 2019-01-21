
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
let txtMedicalCondition = document.getElementsByName("txtMedicalCondition"); 

let btnSaveChanges = document.getElementById("btnSaveChanges");

let currentDate = new Date().toDateString();


var patientID = getUrlVars()["pid"];

console.log(patientID + " was clicked")

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}




getPatientDetail(patientID);


  // Get individual user name by uid
  function getPatientDetail(pid) {

    return (
      firebase
        .database()
        //Node level user and fetching record where node key = uid
        .ref("/patient/" + pid)
        .once("value")
        .then(function(snapshot) {
          var selectedUser = snapshot.val();
          txtFullName.value = selectedUser.fullname;
          txtContactNumber.value = selectedUser.contactnumber;
          txtEmergencyNumber.value = selectedUser.emergencynumber;
          txtDob.value = selectedUser.dob;
       //   txtGender.value = selectedUser.gender;

       // Selecting Gender from DB query
          for (var i = 0; i < txtGender.length; i++) {
            if (txtGender[i].value === selectedUser.gender) {

              txtGender[i].checked = true;
            
            }
        }

         


           // Selecting Maritial status from DB query
           for (var i = 0; i < txtMaritalStatus.length; i++) {
            if (txtMaritalStatus[i].value === selectedUser.maritalstatus) {

              txtMaritalStatus[i].checked = true;
            
            }
        }

          txtCity.value = selectedUser.city;
          txtAddress.value = selectedUser.address;
          txtPersonHeight.value = selectedUser.personheight;
          txtPersonWeight.value = selectedUser.personweight;
          txtMedicalCondition.value = selectedUser.medicalcondition;

          
           // Selecting Medical from DB query
           for (var i = 0; i < txtMedicalCondition.length; i++) {
            if (txtMedicalCondition[i].value === selectedUser.medicalcondition) {

              txtMedicalCondition[i].checked = true;
            
            }
        }


        
           // Selecting Medical from DB query
           var medicalconditionComma = [];
           medicalconditionComma = selectedUser.medicalcondition.split(',')
           for (var i = 0; i < txtMedicalCondition.length; i++) {
            //console.log(selectedUser.medicalcondition.split(/,(.+)/)[i]);
            if (txtMedicalCondition[i].value === medicalconditionComma[i]) {

              

              txtMedicalCondition[i].checked = true;
            
            }
        }

     
    /* var match = selectedUser.medicalcondition.split(',')
    console.log(match)
    console.log(match[a])
    for (var a in match)
  
    {
      if (txtMedicalCondition[a].value === match[a]) {

        txtMedicalCondition[a].checked = true;
        
      }

    } */

 
        })
        .catch(function(error) {
          console.error("Error reading data from Realtime Database:", error);
        })
    );
  }



//Add SignUp Event
btnSaveChanges.addEventListener("click", e => {
    var fullname = txtFullName.value;
    var contactnumber = txtContactNumber.value;
    var emergencynumber = txtEmergencyNumber.value;
    var dob = txtDob.value;

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


    var city = txtCity.value;
    var address = txtAddress.value;
    var personheight = txtPersonHeight.value;
    var personweight = txtPersonWeight.value;
    var medicalcondition = [];
    
    for (var i = 0; i < txtMedicalCondition.length; i++) {
      if (txtMedicalCondition[i].checked) {
          medicalcondition.push(txtMedicalCondition[i].value);
      }
   }

    console.log(fullname + "-" + contactnumber + "-" + emergencynumber + "-" + dob + "-" + gender + "-" + maritalstatus + "-" + city + "-" + address + "-" + personheight + "-" + personweight + "-" + medicalcondition);
    editPatient(fullname,contactnumber,emergencynumber,dob,gender,maritalstatus,city,address,personheight,personweight,medicalcondition.toString());
    



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

  //Update Patient info in database
function editPatient(fullname,contactnumber,emergencynumber,dob,gender,maritalstatus,city,address,personheight,personweight,medicalcondition) {
    
    firebase
      .database()
      //Node level user and asssing user auth uid as key of this record
      .ref("patient/" + patientID)
      .update({
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


