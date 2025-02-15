const express = require("express");
// const { users } = require("./data/users.json");
// const { books } = require("./data/books.json");

const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exists",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
