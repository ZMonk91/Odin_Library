let myLibrary = [];

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

function loadLib() {
    if (localStorage.getItem('myLibrary')) {
        myLibrary.push(localStorage.getObj('myLibrary'))
        updateList()
    } else {
        pass();
    }
}

function Lib() {

}

function removeBook(id) {
    myLibrary.splice(id, 1)
    updateList()
}
function findCover(title) {

    url = "http://openlibrary.org/search.json?title=" + title.replace(' ', '+')
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            coverImage = "http://covers.openlibrary.org/b/id/" + out.docs[0].cover_i + "-S.jpg"
        })
        .catch(err => {
            coverImage = "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif"
            throw err
        });

}

function Book(title, author, pages, status) {
    //this.cover = findCover(title)
    this.id = myLibrary.length
    this.title = title
    this.author = author
    this.pages = pages
    this.read = status;
}

Book.prototype = Object.create(Lib.prototype)

function addBook() {
    let currentTitle = document.getElementById('title').value
    //let currentCover = findCover(currentTitle)
    let currentAuthor = document.getElementById('author').value
    let currentPages = document.getElementById('pages').value
    let currentStatus = document.getElementById('status-selection').value
    let currentBook = new Book(currentTitle, currentAuthor, currentPages, currentStatus);
    myLibrary.push(currentBook)

    localStorage.setObj('myLibrary', currentBook)
    updateList()

}

function updateList() {
    table = document.getElementById('book-list')
    let book_update = ' '
    let book_count = 0

    myLibrary.forEach(book => {
        book_count += 1
        book_update +=
            '<tr><th scope ="row">' + book_count + '</th >' +
            '<td><img async=off src="' + findCover(book.title) + '"></td>' +
            '<td>' + book.title + '</td>' +
            '<td>' + book.author + '</td>' +
            '<td>' + book.pages + '</td>' +
            '<td>' + book.read + '</td>' +
            '<td> <button type="button" ' +
            'class="btn btn-danger remove-btn"' +
            'onClick="removeBook(' + (book_count - 1) + ')"  >' +
            'remove</button></td></tr >'
    });
    table.innerHTML = book_update

}

