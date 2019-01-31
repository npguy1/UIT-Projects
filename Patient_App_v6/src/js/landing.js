
 // Get DOM elements

let linkSignOut = document.getElementById("linkSignOut");
let btnAddNewPatient = document.getElementById("btnAddNewPatient");
let btnViewPatients = document.getElementById("btnViewPatients");



 //Add SignOut Event
 btnAddNewPatient.addEventListener("click", e => {
  
  location.href = "createPatient.html";

});


 //Add SignOut Event
 btnViewPatients.addEventListener("click", e => {
  
  location.href = "listPatient.html";
  
});





