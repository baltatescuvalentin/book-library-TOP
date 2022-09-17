

const modal = document.querySelector('.modal');
const title = document.querySelector("input[id='title']");
const author = document.querySelector("input[id='author']");
const pages = document.querySelector("input[id='pages']");
const didRead = document.querySelector("input[id='didread'");
const submit = document.querySelector('.submitBtn_form');
const addBook = document.querySelector('.addBtn');
const main = document.querySelector('.main');
const close_window = document.querySelector('.close_window');
const form_warning = document.querySelector('.warning_form');
const booksGrid = document.querySelector('.books_grid');
const form = document.querySelector('.book_form');


class Book {
    constructor( title = 'Unknown',
                author = 'Unknown',
                pages = '0',
                didRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.didRead = didRead;
    }

    changeRead() {
        this.didRead = !(this.didRead);
    }
} 

class Library {
    constructor() {
        this.library = [];
    }

    addBook(newBook) {
        if (!this.inLibrary(newBook)) {
            this.library.push(newBook);
            return true;
        }
        return false;
    }

    getBook(title) {
        return this.library.find((book) => book.title === title);
    }

    inLibrary(newBook) {
        return this.library.some((book) => book.title === newBook.title && book.author === newBook.author);
    }

    removeBook(title) {
        this.library = this.library.filter((book) => book.title !== title);
    }

    changeReadOfBook(title) {
        this.getBook(title).changeRead();
    }
}

var library = new Library();


function open_form() {


    main.style.filter = 'blur(10px)';
    main.style.pointerEvents = 'none';

    modal.classList.add('active');
}

function close_form() {

    main.style.filter = null;
    main.style.pointerEvents = null;

    modal.classList.remove('active');

    title.value = '';
    author.value = '';
    pages.value = '';
    didRead.checked = false;

}

function create_book() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookDidRead = didRead.checked;
    console.log(bookAuthor, bookTitle, bookPages, bookDidRead);

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookDidRead);

    return newBook;
}

function create_book_card(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book_card');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('button');
    const remove = document.createElement('button');
    read.classList.add('cardBtn');
    remove.classList.add('cardBtn');

    title.textContent = book.title;
    author.textContent = `By ${book.author}`;
    pages.textContent = `${book.pages} pages`;

    if(book.didRead) {
        read.textContent = 'Read';
        read.classList.add('read');
    }
    else {
        read.textContent = 'Not Read';
        read.classList.add('not_read');
    }

    remove.textContent = "Remove";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    console.log(bookCard);
    booksGrid.appendChild(bookCard);

    read.onclick = toggleRead;
    remove.onclick = removeBook;
}

function toggleRead(e) {

    const title = e.target.parentNode.firstChild.innerHTML;
    const book = library.getBook(title);
    const didRead = book.didRead;
    const changeClass = e.target.parentNode.childNodes[3];
    
    if(didRead) {
        changeClass.classList.remove('read');
        changeClass.classList.add('not_read');
        changeClass.textContent = 'Not Read';

        book.changeRead();
    }
    else {
        changeClass.classList.add('read');
        changeClass.classList.remove('not_read');
        changeClass.textContent = 'Read';
        

        book.changeRead();
    }
}

function removeBook(e) {

    console.log(e);
    
    const title = e.target.parentNode.firstChild.innerHTML;
    const parent = e.target.parentNode;

    booksGrid.removeChild(parent);

    library.removeBook(title);

}


function submit_form() {

    if(title.value === '' || author.value === '' || pages.value === '') {
        return;
    }


    // if(title.textContent == '' || author.textContent == '' || pages.textContent == '')
    //     return;

    const newBook = create_book();
    console.log(newBook);
    if(library.addBook(newBook)) {
        form_warning.style.display = 'none';
        create_book_card(newBook);
        console.log(booksGrid);
        close_form();
    }
    else {
        form_warning.textContent = "This book already exists!";
        form_warning.style.display = 'block';
    }
}

addBook.addEventListener('click', open_form);
submit.addEventListener('click', submit_form);
close_window.addEventListener('click', close_form);