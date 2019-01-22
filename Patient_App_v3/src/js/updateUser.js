// Get DOM elements

let txtUpdateName = document.getElementById("txtUpdateName");

let btnSave = document.getElementById("btnSave");



//Add Save Event
btnSave.addEventListener("click", e => {
  var userName = txtUpdateName.value;

  updateUser(selectedUser, userName);
  console.log("User Updated");
});

//Add user info in database
function updateUser(uid, userName) {
  firebase
    .database()
    //Node level user and asssing user auth uid as key of this record
    .ref("/user/" + uid)
    .update({
      uname: userName
    })
    .catch(function(error) {
      console.error("Error writing new user to Realtime Database:", error);
    });
}
