$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var ageInput = $("input#age-input")
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("sign up submitted")
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      age: ageInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    console.log(userData)
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.age, userData.email, userData.password);
    nameInput.val("");
    ageInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, age, email, password) {
    console.log("func signupuser called")
    $.post("/api/signup", {
      name: name,
      age: age,
      email: email,
      password: password
    }).then(function(data) {
        console.log("yay signed up")
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => handleLoginErr(err))
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err);
    $("#alert").fadeIn(100);
  }
});
