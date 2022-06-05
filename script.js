const container = document.querySelector(".flex-container");
const bookAdmittance = document.querySelector(".book-admittance");
const newBookButton = document.querySelector(".new-book");
const submitButton = document.querySelector(".submit");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formRead = document.getElementById("read");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");
const error3 = document.querySelector(".error3");

// Elements

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return [title, author, pages, read];
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log("test", myLibrary);
}

function formFieldValidationText(text) {
  const regex = /^[a-zA-Z!' ]+$/;
  if (regex.test(text)) {
    return true;
  } else return false;
}

function formFieldValidationNumbers(text) {
  const regex = /^[0-9 ]+$/;
  if (regex.test(text)) {
    return true;
  } else return false;
}

function displayBook(parameters) {
  // debugger
  let html = ``;
  html += `<div class="book-card">`;
  for (const parameter of parameters) {
    if (parameter !== parameters[0]) {
      html = "";
      html += `<div class="book-card">`;
    }
    let i = 0;
    for (const property in parameter) {
      if (property !== "info") {
        if (i === 0) {
          html += `<h2>${parameter[property]}</h2>`;
        } else {
          html += `<p>${parameter[property]}</p>`;
        }
      }
      i++;
    }
  }

  html += `
  <div class="button-container">
  <button class="remove-book">Remove</button>
  <select name="read" class="read-status">
  <option value="Read">Read</option>
  <option value="Not Read">Not Read</option>
  </select>
  </div>`;
  html += `</div>`;

  container.innerHTML += html;
}

function newBook() {
  newBookButton.addEventListener("click", () => {
    bookAdmittance.classList.toggle("hidden");
  });
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let book = new Book(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formRead.value
    );
    if (formFieldValidationText(formTitle.value) === false) {
      error1.classList.add("show");
      e.preventDefault();
    }

    if (formFieldValidationText(formAuthor.value) === false) {
      error2.classList.add("show");
      e.preventDefault();
    }
    if (formFieldValidationNumbers(formPages.value) === false) {
      error3.classList.add("show");
      e.preventDefault();
    }

    if (
      formFieldValidationNumbers(formPages.value) === true &&
      formFieldValidationText(formTitle.value) === true &&
      formFieldValidationText(formAuthor.value) === true
    ) {
      error1.classList.remove("show");
      error2.classList.remove("show");
      error3.classList.remove("show");
      addBookToLibrary(book);
      displayBook(myLibrary);
      bookAdmittance.reset();

      removeBooksOnSubmit();
      changeReadStatuses()
    }
  });
}

function changeReadStatusInitial() {
  readStatus = document.querySelector(".read-status");
  readStatus.addEventListener("click", function (e) {
    let h1String = e.currentTarget.parentNode.parentNode.firstChild.innerHTML;

    outerLoop: for (const obj of myLibrary) {
      if (obj.title === h1String) {
        console.log("1");
        obj.read === readStatus.value;
        console.log(
          obj,
          e.currentTarget.parentNode.parentNode.firstChild.nextSibling
            .nextSibling.nextSibling.innerText
        );
        e.currentTarget.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerText =
          readStatus.value;
          
        break outerLoop;
      }
    }
  });
}

function changeReadStatuses() {
  let bookCardList = document.querySelectorAll(".book-card")
  bookCardList.forEach(function (bookCard) {
    bookCard.addEventListener("mouseenter", (e) =>  {
      console.log("entering div", )
     let readStatus = e.currentTarget.childNodes[5].childNodes[3]
      
      readStatus.addEventListener("click", function (e) {
        let h1String = e.currentTarget.parentNode.parentNode.firstChild.innerHTML;
  
        console.log(h1String);
        console.log(readStatus.value);
        console.log(e.currentTarget.parentNode.parentNode.firstChild.innerHTML);
        outerLoop: for (const obj of myLibrary) {
          if (obj.title === h1String) {
            obj.read === readStatus.value;
          
            e.currentTarget.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerText =
              readStatus.value;
            break outerLoop;
          }
        }
      });
    })
   
  });
}

function removeBookInitial() {
  removeButton = document.querySelector(".remove-book");
  removeButton.addEventListener("click", (e) => {
    e.currentTarget.parentNode.parentNode.remove();
    console.log(e.currentTarget.parentNode.parentNode.innerHTML);
    console.log(myLibrary);
    for (const parameter of myLibrary) {
      console.log(parameter);
      for (const property in parameter) {
        if (property.title === e.target.value) console.log("yes");
      }
    }
  });
}

function removeBooksOnSubmit() {
  let removeButtonElements = document.querySelectorAll(".remove-book");
  removeButtonElements.forEach(function (removeButton) {
    removeButton.addEventListener("click", (e) =>
      e.currentTarget.parentNode.parentNode.remove()
    );
  });
}

function Book2(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  let returned = `${title} ${author} ${pages} ${read}`;
  this.info = function () {
    return returned;
  };
}

const aliceInWonderLand = new Book(
  `Alice In Wonderland`,
  "Lewis Carroll,",
  "52 pages,",
  "Not Read"
);
const aliceInWonderLand2 = new Book2(
  `Alice In Wonderland by`,
  "Lewis Carroll,",
  "52 pages,",
  "Not Read"
);
addBookToLibrary(aliceInWonderLand);
let infoPrint = aliceInWonderLand.info().join(" ");
console.log(infoPrint);
console.log(aliceInWonderLand2.info());

displayBook(myLibrary);

newBook();
console.log(formFieldValidationText("asadsafgsdds"));
console.log(formFieldValidationNumbers("423232"));
console.log(formFieldValidationText("222"));
// Since it is a JS generated element I have to add the querySelector after it has been generated.

removeBookInitial();
changeReadStatusInitial();
changeReadStatuses()