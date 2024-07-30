document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display books when the page loads
    displayBooks();

    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var searchTerm = document.querySelector('.search-bar input').value;
        searchBooks(searchTerm);
    });

});

function displayBooks() {
    // Fetch books from the server
    fetch('/getBooks')
        .then(response => response.json())
        .then(data => {
            console.log('Books data:', data)
            // Update the HTML to display the retrieved book information
            var shopSection = document.querySelector('.shop-section');
            shopSection.innerHTML = '';

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
                            <p>Email: ${books.email}</p>
                        </div>
                    
                    </div>
                `;
                    shopSection.appendChild(boxDiv);
                });
            } else {
                // Display a message if no books are found
                shopSection.innerHTML = '<p>No books found.</p>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function searchBooks(searchTerm) {
    // Fetch books from the server based on search term
    fetch(`/searchBooks?term=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Update the HTML to display the retrieved book information
            var shopSection = document.querySelector('.shop-section');
            shopSection.innerHTML = '';

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
                            <p>Email: ${books.email}</p>
                        </div>
   
                    </div>
                `;
                    shopSection.appendChild(boxDiv);
                });
            } else {
                // Display a message if no matching books are found
                shopSection.innerHTML = '<p>No matching books found.</p>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
