function goBack() {
    window.history.back();
}

document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('bookImage');
    const bookTitle = document.getElementById('bookTitle').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    if (!fileInput.files[0] || !bookTitle || !price || !description) {
        alert('Please fill in all fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const bookImage = e.target.result;

        const formData = {
            bookImage: bookImage,
            bookTitle: bookTitle,
            price: price,
            description: description
        };

        fetch('/booklisting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Book added for sale successfully!');
                    window.location.href = '/Home/index.html';
                } else {
                    alert('Failed to add book for sale. Please try again.');
                    console.log('Failed to add book for sale. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to add book for sale. Please try again.');
                console.log('Failed to add book for sale. Please try again.');
            });
    };

    // Read the file as a base64-encoded string
    reader.readAsDataURL(fileInput.files[0]);
});
