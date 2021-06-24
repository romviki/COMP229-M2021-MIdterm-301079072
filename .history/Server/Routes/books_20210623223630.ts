/* books.ts : Viktoriia Romaniuk : 301079072 : Book List */

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// Import Book model object
import Book from '../Models/books';

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
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

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Create new Book object and pass it as a reference to the details view
    let book = new Book();
    res.render('books/details', { title: 'New Book', page: 'New Book', books: book});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Adding submit processing logic adding 
    let newBook = new Book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

     Book.create(newBook, (err: Error, book : any) => {
      if (err)
      {
          console.log(err);
          res.end(err);
      }
      else 
      {
          // refresh the contact list
          res.redirect('/books')
      }
  });


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Adding router logic for edit GET
    let id = req.params.id;

     Book.findById(id, (err:Error, book: any) => {
         if (err) 
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // show the edit view
             res.render('books/details', { title: book.Title, page: 'Book edit', books: book})
         }
     });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Adding router logic for edit POST
    let id = req.params.id;

     let updateBook = new Book ({
         "_id": id,
         "Title": req.body.title,
         "Price": req.body.price,    
         "Author": req.body.author,
         "Genre": req.body.genre
     });
 
     Book.updateOne({"_id": id}, updateBook, {}, (err) => {
         if (err) 
         {
             console.log(err);
             res.end(err);
         }  
         else
         {
             // refresh the contact list
             res.redirect('/books');
         }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Adding GET logic for delete route
    
});


//module.exports = router;
