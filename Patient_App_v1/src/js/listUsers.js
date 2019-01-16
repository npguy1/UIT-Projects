

let selectedUser;

getUserList();


// Get all users
function getUserList() {
    var columnLenght = 3;
  
    return (
      firebase
        .database()
        //Node level user
        .ref("/patient/")
        .orderByChild('fullname')
        .once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
  
            console.log(childKey + " " + childData.fullname + " " + childData.contactnumber + " " + childData.address);
  
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


      /*         
            //creating table row
            var tr = document.createElement("tr");
            //creating table td
          var td = document.createElement("td");

          //Putting celldata in td one by one
          td.appendChild(
            document.createTextNode(childData.contactnumber)
          );
          tr.appendChild(td);

             //creating table row
             var tr = document.createElement("tr");
             //creating table td
           var td = document.createElement("td");
 
           //Putting celldata in td one by one
           td.appendChild(
             document.createTextNode(childData.address)
           );
           tr.appendChild(td);
         */
  
            // Create TD and Update button inside
            var td = document.createElement("td");
            var btnu = document.createElement("BUTTON");
            var btnTxtu = document.createTextNode("View Details");
            btnu.className = "btn btn-primary btn-sm view-details";
            btnu.id = childKey;
            btnu.appendChild(btnTxtu);
            td.appendChild(btnu);
            tr.appendChild(td);


  
/*             // Creating TD and Delete button inside
            var td = document.createElement("td");
            var btn = document.createElement("BUTTON");
            var btnTxt = document.createTextNode("Delete");
            btn.className = "btnDelete";
            btn.id = childKey;
            btn.appendChild(btnTxt);
            td.appendChild(btn);
            tr.appendChild(td); */


  
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
  
      console.log(
        "View Detail Button item ",
        e.target.id.replace("post-", ""),
        " was clicked!"
      );
  
      /* return (
        firebase
          .database()
          //Node level user and fetching record where node key = uid
          .ref("/user/" + selectedUser)
          .once("value")
          .then(function(snapshot) {
            var loggedInUser = snapshot.val();
            var username = loggedInUser.uname;
  
            document.getElementById("txtUpdateName").value = username;
          })
          .catch(function(error) {
            console.error("Error reading data from Realtime Database:", error);
          })
      ); */

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