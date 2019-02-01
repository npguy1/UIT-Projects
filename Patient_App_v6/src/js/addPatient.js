
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



let btnAddMoreMed = document.getElementById("btnAddMoreMed");

let btnAddPatient = document.getElementById("btnAddPatient");


function getCurrentDate() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  if(dd<10) {
      dd = '0'+dd
  } 
  
  if(mm<10) {
      mm = '0'+mm
  } 
  
  today = dd + '/' + mm + '/' + yyyy;
  
  return today;
  
  }
  
  let currentDate =  getCurrentDate() // dd/mm/yy;

  console.log(currentDate);


//Add SignUp Event
btnAddPatient.addEventListener("click", e => {
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

console.log(medicines);

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
      testSuggested + "-"+ 
      currentDate);

      console.log("form " + checkForm());

    if(checkForm()) {

let allErrorDivs = document.getElementsByClassName("text-danger small");
let allInputFields = document.getElementsByClassName("form-control");

for(var i=0; i < allInputFields.length; i++) {

  allInputFields[i].value="";

}

for(var i=0; i < allErrorDivs.length; i++) {

  allErrorDivs[i].innerHTML="";

}



      console.log("i am in  ");

       addPatient(
        fullName,
        contactNumber,
        visitPurpose,
        dob,
        fever,
        bp,
        medicines.toString(),
        allergies,
        testSuggested,
        medicalcondition.toString(),
        currentDate); 

    }
    

  });



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
function addPatient(
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
      .ref("patient/")
      .push()
      .set({
        fullName: fullName,
        contactNumber: contactNumber,
        visitPurpose: visitPurpose,
        dob: dob,
        fever: fever,
        bp: bp,
        medicines: medicines,
        allergies: allergies,
        testSuggested: testSuggested,
        arrivalDate: currentDate,
        medicalcondition: medicalcondition

      }).then(function(){


        document.activeElement.blur();
        $(".alert-success").show();
        setTimeout(function(){ $(".alert-success").remove(); }, 3000);
/* 
      window.setTimeout(function() {
      $(".alert-success").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
    }, 4000); */

 



      })
      .catch(function(error) {
        console.error("Error writing new user to Realtime Database:", error);

    /*     $("#error-alert").show();
        $("#error-alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#error-alert").slideUp(500);
           });    */

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


$(document).ready (function(){
  $("#success-alert").hide();
  $("#error-alert").hide();
 
});