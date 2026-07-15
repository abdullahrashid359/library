const myLibrary = []

function Book (id, title, author, pages, haveRead) {
    if(!new.target)
        throw new Error ("You must use the 'new' operator to call the constructor");

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead ? "Read" : "Not read yet"}`;
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

        const title = document.createElement("h2");
        title.textContent = book.title;
        title.classList.add("title");

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("p");
        pages.textContent = "Pages: " + book.pages;

        const status = document.createElement("p");
        status.textContent = "Status: " + (book.haveRead ? "Read" : "Not read yet");

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);

        library.appendChild(card);
    }

}

displayBooks();
