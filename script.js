// Array to store books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Push new books to library array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Get book from inputs and utilize previous function within
function addBookFromForm() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    if (!title || !author || !pages) {
        alert('Please fill out each field!');
        return;
    }

    addBookToLibrary(title, author, pages, read);
    renderBook({title, author, pages, read}, myLibrary.length - 1);
    clearForm();
}

// Clear form after submission
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
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
    newBookDialog.close();
})

// Close dialog modal without submission
const closeDialogBtn = document.getElementById('closedialog');
closeDialogBtn.addEventListener('click', () => {
    newBookDialog.close();
    clearForm();
});

// Append new books to bookshelf
function renderBook(book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookcard');
    bookCard.dataset.index = index;

    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? "Yes" : "No"}</p>
    <button onclick="deleteBook(${index})">Delete Book</button>
    `;

    const bookGrid = document.querySelector('.bookgrid');
    bookGrid.appendChild(bookCard);
}

// Delete books from bookshelf
function deleteBook(index) {
    myLibrary.splice(index, 1);

    const bookGrid = document.querySelector('.bookgrid');
    const bookCard = bookGrid.querySelector(`[data-index="${index}"]`);
    bookGrid.removeChild(bookCard);

    // Reassign book indices in array
    const bookCards = document.querySelectorAll('.bookcard');
    bookCards.forEach((card, idx) => {
        card.dataset.index = idx;
    })
}
