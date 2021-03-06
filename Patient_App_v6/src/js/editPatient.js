
// Get DOM elements

let txtFullName = document.getElementById("txtFullName");
let txtContactNumber = document.getElementById("txtContactNumber");
let txtDob = document.getElementById("txtDob");

let txtVisitPurpose = document.getElementById("txtVisitPurpose");
let txtFever = document.getElementById("txtFever");
let txtBP = document.getElementById("txtBP");
let txtMedicalCondition = document.getElementsByName("txtMedicalCondition");
let txtMedicines = document.getElementsByName("txtMedicines");
let txtAllergies = document.getElementById("txtAllergies");
let txtTestSuggested = document.getElementById("txtTestSuggested");

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
          txtFullName.value = selectedUser.fullName;
          txtContactNumber.value = selectedUser.contactNumber;
          txtVisitPurpose.value = selectedUser.visitPurpose;
          txtDob.value = selectedUser.dob;
       //   txtGender.value = selectedUser.gender;

   /*     // Selecting Gender from DB query
          for (var i = 0; i < txtGender.length; i++) {
            if (txtGender[i].value === selectedUser.gender) {

              txtGender[i].checked = true;
            
            }
        }
 */
         


/*            // Selecting Maritial status from DB query
           for (var i = 0; i < txtMaritalStatus.length; i++) {
            if (txtMaritalStatus[i].value === selectedUser.maritalstatus) {

              txtMaritalStatus[i].checked = true;
            
            }
        } */

          txtFever.value = selectedUser.fever;
          txtBP.value = selectedUser.bp;
          txtAllergies.value = selectedUser.allergies;
          txtTestSuggested.value = selectedUser.testSuggested;
          //txtMedicalCondition.value = selectedUser.medicalcondition;


          
   /*         // Selecting Medical from DB query
           for (var i = 0; i < txtMedicalCondition.length; i++) {
            if (txtMedicalCondition[i].value === selectedUser.medicalcondition) {

              txtMedicalCondition[i].checked = true;
            
            }
        } */


        
           // Selecting Medical from DB query
           var medicalconditionComma = [];
           medicalconditionComma = selectedUser.medicalcondition.split(',')
           console.log("metical " + medicalconditionComma);
           for (var i = 0; i < medicalconditionComma.length; i++) {

              for (var j=0; j < txtMedicalCondition.length; j++ ) {

              //console.log("medical condition_out " + medicalconditionComma[i] + " == " + txtMedicalCondition[i].value);
            if (txtMedicalCondition[j].value === medicalconditionComma[i]) {

              console.log("medical condition_in " + medicalconditionComma[i] + " == " + txtMedicalCondition[j].value);

              txtMedicalCondition[j].checked = true;
            
            }



              }
     
            
        }

         
        // Selecting Medicines from DB query
        var medicinesComma = [];
        medicinesComma = selectedUser.medicines.split(',')
        //console.log(medicinesComma);
        for (var i = 0; i < medicinesComma.length; i++) {
         //console.log(selectedUser.medicalcondition.split(/,(.+)/)[i]);
         if ( medicinesComma[i] !== "") {

          txtMedicines[i].value = medicinesComma[i];

         
         } 

        
     }

     
  

 
        })
        .catch(function(error) {
          console.error("Error reading data from Realtime Database:", error);
        })
    );
  }


//Save Changes Event
btnSaveChanges.addEventListener("click", e => {
  var fullName = txtFullName.value;
  var contactNumber = txtContactNumber.value;
  var dob = txtDob.value;
  var visitPurpose = txtVisitPurpose.value;
  var fever = txtFever.value;
  var bp = txtBP.value;
  var allergies = txtAllergies.value;
  var testSuggested = txtTestSuggested.value;

  var medicines = [];

  for (var i = 0; i < txtMedicines.length; i++) {
    if (txtMedicines[i].value != "") {
      medicines.push(txtMedicines[i].value);
    }
 }

  var medicalcondition = [];
  
  for (var i = 0; i < txtMedicalCondition.length; i++) {
    if (txtMedicalCondition[i].checked) {
        medicalcondition.push(txtMedicalCondition[i].value);
    }
 }




  console.log(
    fullName + "-" + 
    contactNumber + "-" + 
    visitPurpose + "-" + 
    dob + "-" + 
    fever + "-" + 
    bp + "-" + 
    medicines + "-" + 
    allergies + "-" + 
    medicalcondition + "-"+ 
    testSuggested);
  


    if(checkForm()) {

      let errorDivs = document.getElementsByClassName("text-danger small");
      
      for(var i=0; i < errorDivs.length; i++) {
      
        errorDivs[i].innerHTML="";
      
      }
      
      
      
            console.log("i am in  ");


  
    editPatient(
    fullName,
    contactNumber,
    visitPurpose,
    dob,
    fever,
    bp,
    medicines.toString(),
    allergies,
    testSuggested,
    medicalcondition.toString());

    }
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




  //Edit Patient info in database
  function editPatient(
    fullName,
    contactNumber,
    visitPurpose,
    dob,
    fever,
    bp,
    medicines,
    allergies,
    testSuggested,
    medicalcondition,
    currentDate) {
      
      firebase
        .database()
        //Node level user and asssing user auth uid as key of this record
        .ref("patient/" + patientID)
        .update({
          fullName: fullName,
          contactNumber: contactNumber,
          visitPurpose: visitPurpose,
          dob: dob,
          fever: fever,
          bp: bp,
          medicines: medicines,
          allergies: allergies,
          testSuggested: testSuggested,
          medicalcondition: medicalcondition
  
        }).then(function(){

          document.activeElement.blur();
          $(".alert-success").show();
          setTimeout(function(){ $(".alert-success").remove(); }, 3000);


        })
        .catch(function(error) {
          console.error("Error writing new user to Realtime Database:", error);
        });
    }
  






// Converting String into Title Case
function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}