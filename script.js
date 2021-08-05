const titleInputElement = document.getElementById("title");
const authorInputElement = document.getElementById("author");
const pagesInputElement = document.getElementById("pages");
const readInputElement = document.getElementById("read");
const addBookBtn = document.getElementById("submit");
const table = document.querySelector(".table");

const book = new Book("Secret Home", "Jackson", 123, "yes");
const book2 = new Book("House", "Jude", 143, "yes");
const book3 = new Book("Building", "Jack", 73, "no");

let myLibrary = [book, book2, book3];

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
  for (let i = 0; i < array.length; i++) {
    createBookCardElement(array[i]);
  }
}

function createBookCardElement(book) {
  const bookCardDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookRead = document.createElement("p");

  bookCardDiv.classList.add("book-container");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  bookRead.textContent = book.isRead;

  bookCardDiv.append(bookTitle);
  bookCardDiv.append(bookAuthor);
  bookCardDiv.append(bookPages);
  bookCardDiv.append(bookRead);
  document.body.append(bookCardDiv);
}

// createBookCardElement(book);

displayBook(myLibrary);

// addBookBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   addBookToLibrary();
//   console.log(myLibrary);
// });
