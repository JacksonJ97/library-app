const newBookBtn = document.querySelector(".new-book-btn");
const modal = document.querySelector(".modal");
const form = document.getElementById("form");
const titleInputElement = document.getElementById("title");
const authorInputElement = document.getElementById("author");
const pagesInputElement = document.getElementById("pages");
const readInputElement = document.getElementById("read");
const booksContainer = document.querySelector(".books-container");

let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    if (this.isRead) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
  }
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function displayBooks(libraryArr) {
  for (let i = 0; i < libraryArr.length; i++) {
    const bookCard = createBookCardElement(libraryArr[i]);
    bookCard.setAttribute("data-index", i);
    booksContainer.append(bookCard);
  }
}

if (localStorage.getItem("library") === null) {
  myLibrary = [];
} else {
  let savedLibrary = JSON.parse(localStorage.getItem("library"));

  // Using the local storage data to recreate the book object which includes the Book.prototype
  for (let i = 0; i < savedLibrary.length; i++) {
    const book = new Book(savedLibrary[i].title, savedLibrary[i].author, savedLibrary[i].pages, savedLibrary[i].isRead);
    myLibrary.push(book);
  }

  displayBooks(myLibrary); // To display the books saved in local storage when the page refreshes
}

function addBookToLibrary() {
  const book = new Book(titleInputElement.value, authorInputElement.value, pagesInputElement.value, readInputElement.checked);
  myLibrary.push(book);
  updateLocalStorage();
}

function createBookCardElement(book) {
  const bookCardDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadStatusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCardDiv.classList.add("book-card");
  bookReadStatusBtn.classList.add("book-read-status-btn");
  removeBtn.classList.add("remove-btn");

  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    bookReadStatusBtn.textContent = "Read";
    bookReadStatusBtn.style.backgroundColor = "#9CA5C7";
  } else {
    bookReadStatusBtn.textContent = "Not Read";
    bookReadStatusBtn.style.backgroundColor = "#FFFFFF";
  }

  bookCardDiv.append(bookTitle);
  bookCardDiv.append(bookAuthor);
  bookCardDiv.append(bookPages);
  bookCardDiv.append(bookReadStatusBtn);
  bookCardDiv.append(removeBtn);

  bookReadStatusBtn.addEventListener("click", function () {
    book.toggleReadStatus();

    if (book.isRead) {
      bookReadStatusBtn.textContent = "Read";
      bookReadStatusBtn.style.backgroundColor = "#9CA5C7";
    } else {
      bookReadStatusBtn.textContent = "Not Read";
      bookReadStatusBtn.style.backgroundColor = "#FFFFFF";
    }

    updateLocalStorage();
  });

  removeBtn.addEventListener("click", function () {
    const index = bookCardDiv.getAttribute("data-index");
    myLibrary.splice(index, 1);
    booksContainer.removeChild(bookCardDiv);

    // Re-assigning the data-index values
    const booksContainerChildrenArr = Array.from(booksContainer.childNodes);

    for (let i = 0; i < booksContainerChildrenArr.length; i++) {
      booksContainerChildrenArr[i].setAttribute("data-index", i);
    }

    updateLocalStorage();
  });

  return bookCardDiv;
}

function displayAddedBook(libraryArr) {
  const bookCard = createBookCardElement(libraryArr[libraryArr.length - 1]);
  booksContainer.append(bookCard);

  // Setting the data-index attribute to the corresponding book card
  bookCard.setAttribute("data-index", libraryArr.length - 1);
}

function resetForm() {
  titleInputElement.value = "";
  authorInputElement.value = "";
  pagesInputElement.value = "";
  readInputElement.checked = false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
  displayAddedBook(myLibrary);
  resetForm();
  modal.style.display = "none";
});

// Event Listeners for the modal //

newBookBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

window.addEventListener("click", function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
