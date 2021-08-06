const newBookBtn = document.querySelector(".new-book-btn");
const modal = document.querySelector(".modal");
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

Book.prototype.toggleReadStatus = function () {
  if (this.isRead) {
    this.isRead = false;
  } else {
    this.isRead = true;
  }
};

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

if (localStorage.getItem("library") === null) {
  myLibrary = [];
} else {
  let savedLibrary = JSON.parse(localStorage.getItem("library"));

  for (let i = 0; i < savedLibrary.length; i++) {
    const book = new Book(savedLibrary[i].title, savedLibrary[i].author, savedLibrary[i].pages, savedLibrary[i].isRead);
    myLibrary.push(book);
  }

  displayBooks(myLibrary);
}

function addBookToLibrary() {
  const book = new Book(titleInputElement.value, authorInputElement.value, pagesInputElement.value, readInputElement.checked);
  myLibrary.push(book);
  updateLocalStorage();
}

function displayAddedBook(libraryArr) {
  const bookCard = createBookCardElement(libraryArr[libraryArr.length - 1]);
  bookCard.setAttribute("data-index", libraryArr.length - 1);
  booksContainer.append(bookCard);
}

function displayBooks(libraryArr) {
  for (let i = 0; i < libraryArr.length; i++) {
    const bookCard = createBookCardElement(libraryArr[i]);
    bookCard.setAttribute("data-index", i);
    booksContainer.append(bookCard);
  }
}

function createBookCardElement(book) {
  const bookCardDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadStatusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookReadStatusBtn.classList.add("book-read-status-btn");
  bookCardDiv.classList.add("book-card");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;

  if (book.isRead) {
    bookReadStatusBtn.textContent = "Read";
    bookReadStatusBtn.style.backgroundColor = "#5ceb09";
  } else {
    bookReadStatusBtn.textContent = "Not Read";
    bookReadStatusBtn.style.backgroundColor = "rgb(248, 125, 116)";
  }

  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  bookCardDiv.append(bookTitle);
  bookCardDiv.append(bookAuthor);
  bookCardDiv.append(bookPages);
  bookCardDiv.append(bookReadStatusBtn);
  bookCardDiv.append(removeBtn);

  bookReadStatusBtn.addEventListener("click", function () {
    book.toggleReadStatus();

    if (book.isRead) {
      bookReadStatusBtn.textContent = "Read";
      bookReadStatusBtn.style.backgroundColor = "#5ceb09";
    } else {
      bookReadStatusBtn.textContent = "Not Read";
      bookReadStatusBtn.style.backgroundColor = "rgb(248, 125, 116)";
    }

    updateLocalStorage();
  });

  removeBtn.addEventListener("click", function () {
    const index = bookCardDiv.getAttribute("data-index");
    myLibrary.splice(index, 1);
    booksContainer.removeChild(bookCardDiv);
    const booksContainerChildrenArr = Array.from(booksContainer.childNodes);

    for (let i = 0; i < booksContainerChildrenArr.length; i++) {
      booksContainerChildrenArr[i].setAttribute("data-index", i);
    }

    updateLocalStorage();
  });

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
  } else if (e.target == form.lastElementChild) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
  resetForm();
  displayAddedBook(myLibrary);
});
