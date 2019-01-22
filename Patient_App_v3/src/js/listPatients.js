let selectedUser;

var test = 1;
//getUserListOnce();
//getUserListOn();

searchTerm = "Noman"
searchByName(searchTerm);


function searchByName(fname){
  //ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot)
  firebase.database().ref("/patient/").orderByChild('fullname').startAt(fname).endAt(fname+"\uf8ff").on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      createDataTable(childKey,childData);
    });
});


}


function createDataTable(childKey,childData){

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

   // Create TD  with Delete Patient button
   var td = document.createElement("td");
   var btnu = document.createElement("BUTTON");
   var btnTxtu = document.createTextNode("Delete Patient");
   btnu.className = "btn btn-primary btn-sm delete-patient";
   btnu.id = childKey;
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
 
  PatientRef.on("value", function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
   console.log("Data List");
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      
      
      createDataTable(childKey,childData);

    });
  }); 

  PatientRef.on("child_removed", function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
    console.log("patient removed");
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      
      
      createDataTable(childKey,childData);

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
      })
  );
}

// Get the element, add a click listener...
document.getElementById("dataListTable").addEventListener("click", function(e) {
  // e.target is the clicked element!

  //UPDATE BUTTON EVENT
  // If it was a button item with btnUpdate class
  if (e.target && e.target.classList.contains("view-details")) {
    // Button item found!  Output the ID!
    selectedUser = e.target.id;

    var patientID = e.target.id;
    var queryString = "?pid=" + patientID;
    //  window.location.href = "patientDetail1.html" + queryString;

    window.open(
      "patientDetail1.html" + queryString,
      "_blank" // <- This is what makes it open in a new window.
    );


    console.log(
      e.target.id + " was clicked!"

      //  e.target.id.replace("post-", "")," was clicked!"
    );
  }

  //DELETE BUTTON EVENT
  // If it was a button item with btnUpdate class
  if (e.target && e.target.classList.contains("delete-patient")) {
    // Button item found!  Output the ID!
    selectedUser = e.target.id;

    var patientID = e.target.id;
    // Deleting User from real time databse
    return (
      firebase
        .database()
        //Node level user and fetching record  by uid
        .ref("/patient/" + patientID)
        .ref.remove()
    );
  }


  /*     //DELETE BUTTON EVENT
    // If it was a button item with btnDelete class
    if (e.target && e.target.className == "btnDelete") {
      // Button item found!  Output the ID!
  
      selectedUser = e.target.id;
  
      console.log(
        "Delete Button item ",
        e.target.id.replace("post-", ""),
        " was clicked!"
      );
  
      // Deleting User from real time databse
      return (
        firebase
          .database()
          //Node level user and fetching record  by uid
          .ref("/user/" + selectedUser)
          .ref.remove()
      );
    }
 */
});
