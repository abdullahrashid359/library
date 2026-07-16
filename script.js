const myLibrary = [];

function Book (id, title, author, pages, haveRead) {
    if(!new.target)
        throw new Error ("You must use the 'new' operator to call the constructor");

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead ? "Read" : "Not read yet"}`;
}

Book.prototype.toggleStatus = function () {
    this.haveRead = !this.haveRead;
}

function addBookToLibrary(title, author, pages, haveRead) {
    const book = new Book(crypto.randomUUID(), title, author, pages, haveRead);
    myLibrary.push(book);
}

addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    310,
    true
);

addBookToLibrary(
    "Atomic Habits",
    "James Clear",
    320,
    false
);

addBookToLibrary(
    "Clean Code",
    "Robert C. Martin",
    464,
    true
);

const library = document.querySelector(".library");

function displayBooks() {
    library.textContent = "";

    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("p");
        pages.textContent = "Pages: " + book.pages;

        const status = document.createElement("p");
        status.textContent = "Status: " + (book.haveRead ? "Read" : "Not read yet");
        status.classList.add("status")

        const actions = document.createElement("div");
        actions.classList.add("card-actions");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", (event) => {
            const id = event.target.closest(".card").dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary.splice(index, 1);
            displayBooks();
        })

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.haveRead ? "Mark as unread" : "Mark as read";
        if (book.haveRead) {
            toggleBtn.classList.add("read-btn");
        } 
        else {
            toggleBtn.classList.add("unread-btn");
        }

        toggleBtn.addEventListener("click", (event) => {
            const id = event.target.closest(".card").dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary[index].toggleStatus();
            toggleBtn.classList.toggle("read-btn");
            toggleBtn.classList.toggle("unread-btn");
            
            event.target.closest(".card").querySelector(".status").textContent = "Status: " + (myLibrary[index].haveRead ? "Read" : "Not read yet");

            event.target.textContent = myLibrary[index].haveRead ? "Mark as unread" : "Mark as read";
        })
        

        actions.appendChild(toggleBtn);
        actions.appendChild(removeBtn);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(actions);

        library.appendChild(card);
    }

}

displayBooks();

const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector("#new-btn");
const form = document.querySelector("form");
const closeBtn = document.querySelector("#close-btn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedRadio = document.querySelector('input[name="status"]:checked');
    const status = selectedRadio.value === "yes";

    addBookToLibrary(title.value, author.value, +pages.value, status);
    displayBooks();
    form.reset();
    dialog.close();
});

closeBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
})

