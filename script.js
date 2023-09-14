// Array to store books
const myLibrary = [];

// Book constructor
let bookIDCounter = 0;
function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Push new books to library array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(bookIDCounter++, title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

// Get book from inputs and utilize previous function within
function addBookFromForm() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    if (!title || !author || !pages) {
        const error = document.getElementById('errorarea');
        error.style.opacity = '1'
        return;
    }
    else {
        const error = document.getElementById('errorarea');
        error.style.opacity = '0';
    }

    let newBook = addBookToLibrary(title, author, pages, read);
    renderBook(newBook);
    clearForm();
    newBookDialog.close();
}

// Clear form after submission
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

    const error = document.getElementById('errorarea');
    error.style.opacity = '0'
}

// Open dialog modal
const newBookDialog = document.getElementById('bookentry')
const newBookBtn = document.getElementById('showdialog');
newBookBtn.addEventListener('click', () => {
    newBookDialog.showModal();
});

// Book submission and closing dialog modal
const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookFromForm();
})

// Close dialog modal without submission
const closeDialogBtn = document.getElementById('closedialog');
closeDialogBtn.addEventListener('click', () => {
    newBookDialog.close();
    clearForm();
});

// Append new books to bookshelf
function renderBook(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookcard');
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button class="readstatus" onclick="toggleReadStatus(${book.id})">${book.read ? "Read" : "Not Read"}</button>
    <button onclick="deleteBook(${book.id})">Delete Book</button>
    `;

    const bookGrid = document.querySelector('.bookgrid');
    bookGrid.appendChild(bookCard);
}

// Delete books from bookshelf
function deleteBook(bookID) {
    const index = myLibrary.findIndex(book => book.id == bookID);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    const bookGrid = document.querySelector('.bookgrid');
    const bookCard = bookGrid.querySelector(`[data-id="${bookID}"]`);
    if (bookCard) {
    bookGrid.removeChild(bookCard);
    }
}

// Toggle read status on submitted books
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleReadStatus(bookID) {
    const book = myLibrary.find(book => book.id == bookID);
    if (book) {
        book.toggleRead();
        const bookCard = document.querySelector(`[data-id="${bookID}"]`);
        if (bookCard) {
            const readStatus = bookCard.querySelector('.readstatus')
            readStatus.textContent = `${book.read ? "Read" : "Not Read"}`;
        }
    }
}

