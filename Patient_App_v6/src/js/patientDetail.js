



// Get DOM elements

let txtFullName = document.getElementById("txtFullName");
let txtContactNumber = document.getElementById("txtContactNumber");
let txtDob = document.getElementById("txtDob");
let txtVisitPurpose = document.getElementById("txtVisitPurpose");
let txtFever = document.getElementById("txtFever");
let txtBP = document.getElementById("txtBP");
let txtMedicalCondition = document.getElementById("txtMedicalCondition");
let txtMedicines = document.getElementById("txtMedicines");
let txtAllergies = document.getElementById("txtAllergies");
let txtTestSuggested = document.getElementById("txtTestSuggested");


let btnEditPatient = document.getElementById("btnEditPatient");

let selectedUser;

var patientID = getUrlVars()["pid"];

console.log(patientID + " was clicked")

// extrating Patient id from query string 
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
          txtFever.value = selectedUser.fever;
          txtBP.value = selectedUser.bp;
          txtMedicines.value = selectedUser.medicines;
          txtAllergies.value = selectedUser.allergies;
          txtTestSuggested.value = selectedUser.testSuggested;
          txtMedicalCondition.value = selectedUser.medicalcondition;
 
        })
        .catch(function(error) {
          console.error("Error reading data from Realtime Database:", error);
        })
    );
  }


  //Add SignUp Event
btnEditPatient.addEventListener("click", e => {
  
  var queryString = "?pid=" + patientID;
  window.location.href = "editPatient1.html" + queryString;


});


// Get all users
function getUserList() {
  
  return firebase
    .database()
    .ref("/patient/" + patientID) //Node level Patient
    .once("value")
    .then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        console.log(
          childKey +
            " " +
            childData.fullname +
            " " +
            childData.contactnumber +
            " " +
            childData.dob
        );

        //creating table row
        var tr = document.createElement("tr");
        //creating table td
        var nameTD = document.createElement("td");
        var contacnumberTD = document.createElement("td");
        var addressTD = document.createElement("td");

        nameTD.innerHTML = childData.fullname;
        contacnumberTD.innerHTML = childData.contactnumber;
        addressTD.innerHTML = childData.address;

        tr.appendChild(nameTD);
        tr.appendChild(contacnumberTD);
        tr.appendChild(addressTD);

        // Create TD  with View detail button
        var td = document.createElement("td");
        var btnu = document.createElement("BUTTON");
        var btnTxtu = document.createTextNode("View Details");
        btnu.className = "btn btn-primary btn-sm view-details";
        btnu.id = childKey;
        btnu.appendChild(btnTxtu);
        td.appendChild(btnu);
        tr.appendChild(td);

        //Adding rows to table by id
        var table = document.getElementById("dataListTable");
        //table.innerHTML = "";
        table.appendChild(tr);
      });
    })
    .catch(function(error) {
      console.error("Error reading data from Realtime Database:", error);
    });
}


/* 
// Get the element, add a click listener...
document.getElementById("dataListTable").addEventListener("click", function(e) {
  // e.target is the clicked element!

  //UPDATE BUTTON EVENT
  // If it was a button item with btnUpdate class
  if (e.target && e.target.classList.contains("view-details")) {
    // Button item found!  Output the ID!
    selectedUser = e.target.id;

    console.log(
      e.target.id + " was clicked!"

      //  e.target.id.replace("post-", "")," was clicked!"
    );


  }

 
}); */
