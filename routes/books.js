const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route:/books
 * Method:GET
 * Description: Getting all books
 * Access:Public
 * Parameters:None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got All Books",
    data: books,
  });
});

/**
 * Route:/books/:issued
 * Method:GET
 * Description: Get all issued books
 * Access:Public
 * Parameters:None
 */
router.get("/issued", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => (book.id = each.issuedBook));

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the Ussued Books..",
    data: issuedBooks,
  });
});

/**
 * Route:/books/:id
 * Method:GET
 * Description: Get books by their id
 * Access:Public
 * Parameters:ID
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found Book By Their ID",
    data: book,
  });
});

/**
 * Route:/
 * Method:POST
 * Description:Adding a new Book
 * Access:Public
 * Parameters:None
 * Data: author,price,id,publisher,name,genre
 */
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data to Add a Book",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "ID Already Exists!!",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added Book Successfully",
    data: allBooks,
  });
});

/**
 * Route:/:id
 * Method:PUT
 * Description:Updating a book
 * Access:Public
 * Parameters:ID
 * Data: author,price,id,publisher,name,genre
 */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book Not Found for this ID",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Updated a Book by their ID",
    data: updateData,
  });
});

module.exports = router;
