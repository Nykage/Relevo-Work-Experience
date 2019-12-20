// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    if (user.uid == "KdNqPQvmUfdZ6rCj8DKKybIsqqt2") {
        console.log('user logged in: ', user);
        document.getElementById("appointments").style.display = "block";
        document.getElementById("log-in").style.display = "none";
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("book-service").style.display = "block";
        document.getElementById("logout").style.display = "block";
        } else {
    console.log('user logged in: ', user);
    document.getElementById("appointments").style.display = "none";
    document.getElementById("log-in").style.display = "none";
    document.getElementById("sign-up").style.display = "none";
    document.getElementById("book-service").style.display = "block";
    document.getElementById("logout").style.display = "block";
    }
  } else {
    console.log('user logged out');
    document.getElementById("appointments").style.display = "none";
    document.getElementById("log-in").style.display = "block";
    document.getElementById("sign-up").style.display = "block";
    document.getElementById("book-service").style.display = "none";
    document.getElementById("logout").style.display = "none";
  }
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html");
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});