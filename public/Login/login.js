// login.js
document.getElementById('login-button').addEventListener('click', function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

    // Prepare login data for server
  const loginData = {
    email: email,
    password: password
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        // Display success message 
        alert('Login successful! Redirecting to the homepage.');
        // Redirect to home page 
        window.location.href = '../Home/index.html';
      } else {
        // Display failure message
        alert('Login failed. Please check your email and password.');
      }
    })
    .catch((error) => {
      // Handle errors
      console.error('Error:', error);
      alert('Login failed. Please check your email and password.');
    });
});


