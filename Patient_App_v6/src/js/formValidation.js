

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var errorDiv = document.createElement("div");
errorDiv.className = "error";


function formValidation() {

 // To check empty form fields.
 if (txtFullName.value.length < 3) {
  txtFullName.focus();
  var errorMessage = "Valid full name is required. Please";
  errorDiv.innerHTML = errorMessage;
  insertAfter(txtFullName, errorDiv);
  return false;
  } else {

    return true;

  }


}

















/* 
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
 */