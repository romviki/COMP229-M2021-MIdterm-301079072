"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
const books_2 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_2.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                page: 'books',
                books: books
            });
        }
    });
});
router.get('/add', (req, res, next) => {
    let book = new books_1.default();
    res.render('books/details', { title: 'New Book', page: 'New Book', books: book });
});
router.post('/add', (req, res, next) => {
    let newBook = new books_1.default({
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });
    books_1.default.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/books');
        }
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('books/details', { title: book.Title, page: 'Book edit', books: book });
        }
    });
});
router.post('/:id', (req, res, next) => {
});
router.get('/delete/:id', (req, res, next) => {
});
//# sourceMappingURL=books.js.map