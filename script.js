const newBookBtn = document.querySelector(".new-book-btn");
const modal = document.querySelector(".modal");
// const addBookBtn = document.getElementById("add-book-btn");
const form = document.getElementById("form");
const titleInputElement = document.getElementById("title");
const authorInputElement = document.getElementById("author");
const pagesInputElement = document.getElementById("pages");
const readInputElement = document.getElementById("read");
const booksContainer = document.querySelector(".books-container");

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const book = new Book(titleInputElement.value, authorInputElement.value, pagesInputElement.value, readInputElement.checked);
  myLibrary.push(book);
}

function displayBook(array) {
  let bookCard = createBookCardElement(array[array.length - 1]);
  booksContainer.append(bookCard);
}

function createBookCardElement(book) {
  const bookCardDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookRead = document.createElement("p");

  bookCardDiv.classList.add("book-card");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  bookRead.textContent = book.isRead;

  bookCardDiv.append(bookTitle);
  bookCardDiv.append(bookAuthor);
  bookCardDiv.append(bookPages);
  bookCardDiv.append(bookRead);

  return bookCardDiv;
}

function resetForm() {
  titleInputElement.value = "";
  authorInputElement.value = "";
  pagesInputElement.value = "";
  readInputElement.checked = false;
}

newBookBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

window.addEventListener("click", function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
  displayBook(myLibrary);
  resetForm();
  modal.style.display = "none";
});
