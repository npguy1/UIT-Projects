let selectedUser;





var patientID = getUrlVars()["pid"];

console.log(patientID + " was clicked")

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}


getUserList();

//getPatientDetail(patientID);


  // Get individual user name by uid
  function getPatientDetail(pid) {

    return (
      firebase
        .database()
        //Node level user and fetching record where node key = uid
        .ref("/patient/" + pid)
        .once("value")
        .then(function(snapshot) {
          var loggedInUser = snapshot.val();
          var fullname = loggedInUser.fullname;
          var contactnumber = loggedInUser.contactnumber;
          var address = loggedInUser.address;
          console.log(fullname +" "+ contactnumber);



                //creating table row
        var tr = document.createElement("tr");
        //creating table td
        var nameTD = document.createElement("td");
        var contacnumberTD = document.createElement("td");
        var addressTD = document.createElement("td");

        nameTD.innerHTML = fullname;
        contacnumberTD.innerHTML = contactnumber;
        addressTD.innerHTML = address;

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



        
        })
        .catch(function(error) {
          console.error("Error reading data from Realtime Database:", error);
        })
    );
  }


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
            childData.address
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
