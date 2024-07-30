// profile.js
document.addEventListener('DOMContentLoaded', () => {
    getUserProfile();
    displayBooks();
});

function goBack() {
    window.history.back();
}


function getUserProfile() {
    fetch('/user') // Assuming this endpoint returns user profile data
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const user = data.user;
                displayUserProfile(user);
            } else {
                alert('Failed to retrieve user profile.');
            }
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
            alert('Failed to retrieve user profile. Please try again.');
        });
}

function displayUserProfile(user) {
    document.getElementById('fullName').value = user.fullName;
    document.getElementById('cityName').value = user.cityName;
    document.getElementById('phoneNo').value = user.phoneNo;
    document.getElementById('email').value = user.email;
}

function openEditContainer() {
    document.getElementById('editContainer').style.display = 'block';
}

function closeEditContainer() {
    document.getElementById('editContainer').style.display = 'none';
}

function updateProfile() {
    const newFullName = document.getElementById('newFullName').value;
    const newCityName = document.getElementById('newCityName').value;
    const newPhoneNo = document.getElementById('newPhoneNo').value;

    const formData = {
        newFullName: newFullName,
        newCityName: newCityName,
        newPhoneNo: newPhoneNo,
    };

    console.log('Request Payload:', formData);

    fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
            closeEditContainer();
            getUserProfile(); // Refresh user profile after update
        } else {
            alert('Failed to update profile. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    });
}

function displayBooks() {
    // Fetch books from the server
    fetch('/userbookdetail')
        .then(response => response.json())
        .then(data => {
            console.log('Books data:', data);

            // Update the HTML to display the retrieved book information
            var shopSection = document.querySelector('.shop-section');

            // Check if shopSection is not null or undefined
            if (shopSection) {
                shopSection.innerHTML = '';  // Clear previous content

                if (data.length > 0) {
                    data.forEach(books => {
                        var boxDiv = document.createElement('div');
                        boxDiv.className = 'box';
                        boxDiv.innerHTML = `
                        <div class="box-content">
                            <div class="box-img" style="background-image: url('${books.bookImage}');" ></div>
                            <div class="book-info">
                                <h3>Book Name: ${books.bookTitle}</h3>
                                <h3>Price: ${books.price}</h3>
                                <p>Description: ${books.description}</p>
                                <button onclick="deleteBook('${books.bookId}')">Delete</button>
                            </div>
                        </div>
                    `;
                        shopSection.appendChild(boxDiv);
                    });
                } else {
                    // Display a message if no books are found
                    shopSection.innerHTML = '<p>No books found.</p>';
                }
            } else {
                console.error('Error: shopSection is null or undefined.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function deleteBook(bookId) {
    const confirmation = confirm('Are you sure you want to delete this book?');

    if (confirmation) {
        fetch('/deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Book deleted successfully!');
                displayBooks(); // Refresh book list after deletion
            } else {
                alert('Failed to delete book. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting book:', error);
            alert('Failed to delete book. Please try again.');
        });
    }
}




function logout() {
    fetch('/logout')
        .then(() => {
            alert('Logout successful!');
            window.location.href = '/Login/login.html';
        })
        .catch(error => {
            console.error('Error during logout:', error);
            alert('Failed to logout. Please try again.');
        });
}
