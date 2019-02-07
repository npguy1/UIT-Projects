// Get DOM elements

let txtFullName = document.getElementById("txtFullName");
let txtArrivalDate = document.getElementById("txtArrivalDate");

let btnSearchPatient = document.getElementById("btnSearchPatient");
let btnClearSearch = document.getElementById("btnClearSearch");
let btnConfirmDelete = document.getElementById("btnConfirmDelete");

let selectedUser;

var patientID;

//convert the date string in the format of dd/mm/yyyy into a JS date object
function parseDate(dateStr) {
  var dateParts = dateStr.split("/");
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

//Getting All User List
getUserListOn();

//Search By Name
function searchByName(fname) {
  //ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot)
  firebase
    .database()
    .ref("/patient/")
    .orderByChild("fullName")
    .startAt(fname)
    .endAt(fname + "\uf8ff")
    .on("value", function(snapshot) {
      console.log(snapshot.val());
      document.getElementById("dataListTable").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        createDataTable(childKey, childData);
      });
    });
}

//Search By Date
function searchByDate(arrivalDate) {
  console.log("this is in dob " + arrivalDate);
  //ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot)
  firebase
    .database()
    .ref("/patient/")
    .orderByChild("arrivalDate")
    .startAt(arrivalDate)
    .endAt(arrivalDate)
    .on("value", function(snapshot) {
      console.log("This is date results " + snapshot.val());
      document.getElementById("dataListTable").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        createDataTable(childKey, childData);
      });
    });
}

//Search By Name and Date
function searchByNameAndDate(fname, arrivalDate) {
  firebase
    .database()
    .ref("/patient/")
    .orderByChild("fullName")
    .startAt(fname)
    .endAt(fname + "\uf8ff")
    .on("value", function(snapshot) {
      console.log(snapshot.val());
      document.getElementById("dataListTable").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childData.arrivalDate == arrivalDate) {
          createDataTable(childKey, childData);
        }
      });
    });
}

//Search Button Event
btnSearchPatient.addEventListener("click", e => {
  var fullname = txtFullName.value;
  var arrivaldate = txtArrivalDate.value;

  if (txtFullName.value != "" && txtArrivalDate.value === "") {
    console.log("txtFullName.value " + fullname);
    searchByName(fullname);
  } else if (txtFullName.value === "" && txtArrivalDate.value != "") {
    console.log("txtArrivalDate.value " + arrivaldate);
    searchByDate(arrivaldate);
  } else if (txtFullName.value != "" && txtArrivalDate.value != "") {
    console.log("Both Values");
    searchByNameAndDate(fullname, arrivaldate);
  } else {
    console.log("Blank Search");
  }

  // Showing Clear Search Button
  btnClearSearch.classList.remove("hide");

  // Hiding  Search button
  btnSearchPatient.classList.add("hide");
});

//Clear Search Button
btnClearSearch.addEventListener("click", e => {
  document.getElementById("dataListTable").innerHTML = "";

  //getUserListOnce();
  getUserListOn();

  txtFullName.value = "";
  txtArrivalDate.value = "";

  // Showing Search Button
  btnSearchPatient.classList.remove("hide");

  // Hiding Clear Search button
  btnClearSearch.classList.add("hide");
});



//Creating Data Table for Patients 

function createDataTable(childKey, childData) {
  //creating table row
  var tr = document.createElement("tr");
  //creating table td
  var nameTD = document.createElement("td");
  var contacnumberTD = document.createElement("td");
  var dobTD = document.createElement("td");

  //Adding database values into TDs 
  nameTD.innerHTML = childData.fullName;
  contacnumberTD.innerHTML = childData.contactNumber;
  dobTD.innerHTML = childData.arrivalDate;

  tr.appendChild(nameTD);
  tr.appendChild(contacnumberTD);
  tr.appendChild(dobTD);

  // Create TD  with View detail button
  var td = document.createElement("td");
  var btnu = document.createElement("BUTTON");
  var btnTxtu = document.createTextNode("View Details");
  btnu.className = "btn btn-primary btn-sm view-details";
  //Adding button id  
  btnu.id = "view" + childKey;
  //Adding Key as a button value  
  btnu.value = childKey;
  btnu.appendChild(btnTxtu);
  td.appendChild(btnu);
  tr.appendChild(td);

  // Create TD  with Delete Patient button
  var td = document.createElement("td");
  var btnu = document.createElement("BUTTON");
  var btnTxtu = document.createTextNode("Delete Patient");
  btnu.className = "btn btn-primary btn-sm delete-patient";
  //Adding button id  
  btnu.id = "delete" + childKey;
  //Adding Key as a button value  
  btnu.value = childKey;
  btnu.name = childData.fullName;
  btnu.appendChild(btnTxtu);
  td.appendChild(btnu);
  tr.appendChild(td);

  //Adding rows to table by id
  var table = document.getElementById("dataListTable");
  //table.innerHTML = "";
  table.appendChild(tr);
}

// Get all users
function getUserListOn() {
  var PatientRef = firebase.database().ref("/patient/");

  document.getElementById("dataListTable").innerHTML = "";

  PatientRef.on("value", function(snapshot) {
    // updateStarCount(postElement, snapshot.val());

    document.getElementById("dataListTable").innerHTML = "";

    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log("Data List " + snapshot.val());
      createDataTable(childKey, childData);
    });
  });
}

// Get all users Once
function getUserListOnce() {
  var columnLenght = 3;

  return (
    firebase
      .database()
      .ref("/patient/") //Node level Patient
      //.orderByChild("fullname") //Sort By Full Name
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();

          console.log("Once");

          /*     console.log(
            childKey +
              " " +
              childData.fullname +
              " " +
              childData.contactnumber +
              " " +
              childData.address
          ); */

          //creating table row
          var tr = document.createElement("tr");
          //creating table td
          var nameTD = document.createElement("td");
          var contacnumberTD = document.createElement("td");
          var addressTD = document.createElement("td");

          nameTD.innerHTML = childData.fullName;
          contacnumberTD.innerHTML = childData.contactNumber;
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
      })
  );
}

// Get the element, add a click listener...
document.getElementById("dataListTable").addEventListener("click", function(e) {
  // e.target is the clicked element!

  //VIEW DETAILS  BUTTON EVENT
  // If it was a button item with view-details class
  if (e.target && e.target.classList.contains("view-details")) {
    // Button item found!  Output the ID!
    selectedUser = e.target.id;

    patientID = e.target.value;

    // adding querysting to buttons 
    var queryString = "?pid=" + patientID;
    //  window.location.href = "patientDetail1.html" + queryString;

    window.open(
    /*   "patientDetails.html" + queryString,
      "_blank" // <- This is what makes it open in a new window. */

      "patientDetails.html" + queryString
    );

    console.log(
      e.target.id + " was clicked!"

      //  e.target.id.replace("post-", "")," was clicked!"
    );
  }

  //DELETE BUTTON EVENT
  // If it was a button item with delete-patient class
  if (e.target && e.target.classList.contains("delete-patient")) {
    // Button item found!  Output the ID!
    selectedUser = e.target.id;

    patientID = e.target.value;
    var patientName = e.target.name;
    console.log("test" + patientName);

    $("#deleteConfirmationModal").modal({ backdrop: "static" });
    document.getElementById("modal-body").innerHTML =
      "<p>Are you sure you want to delete patient name <strong>" +
      patientName +
      "</strong></p>";

  }

  //Confirm Delete Button
  btnConfirmDelete.addEventListener("click", e => {
    // Deleting User from real time databse
    return (
      firebase
        .database()
        //Node level user and fetching record  by uid
        .ref("/patient/" + patientID)
        .ref.remove()
        .then(function() {
          $("#deleteConfirmationModal").modal("hide");
        })
    );
  });

  
});

// Converting String into Title Case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Show modal funtion 
function showModal(pid) {
  $(document).ready(function() {
    $("#view" + pid).click(function() {
      $("#exampleModal").modal({ backdrop: "static" });
    });
  });
}
