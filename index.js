const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

/**
 * Route:/users
 * Method:GET
 * Description: Get All users
 * Access:Public
 * Parameters:None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exists",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
