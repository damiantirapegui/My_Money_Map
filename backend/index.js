const express = require("express");
const addUser = require("./controllers/addUser");
const loginUser = require("./controllers/loginUser");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.post("/add-user", addUser);
app.post("/login", loginUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
