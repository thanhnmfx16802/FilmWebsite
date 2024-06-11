const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const movieRouters = require("./routes/movie");
const authToken = require("./middleware/auth");

app.use("/", authToken, movieRouters);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(5000);
