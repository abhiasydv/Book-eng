document.getElementById('register-button').addEventListener('click', function (event) {
    event.preventDefault();

    // Get values from input fields
    const fullName = document.getElementById('fullName').value;
    const cityName = document.getElementById('cityName').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if all fields are provided
    if (!fullName || !cityName || !phoneNo || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare registration data for server
    const registrationData = {
        fullName: fullName,
        cityName: cityName,
        phoneNo: phoneNo,
        email: email,
        password: password
    };

    // Send the registration data to the server for processing
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                // Display success message
                alert('Registration successful!');
                // Redirect to Home page 
                window.location.href = '../Home/index.html';
            } else {
                // Display failure message
                alert('Registration failed. Please try again.');
            }
        })
        .catch((error) => {
            // Handle errors
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
});
