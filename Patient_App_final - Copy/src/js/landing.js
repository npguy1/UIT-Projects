// Get DOM elements

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

//Add SignOut Event
linkSignOut.addEventListener("click", e => {
  // funtion from signOut.js
  signOut();
});
