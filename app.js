const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: ".env" });

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "API for quotes and authors. Check out the documentation below🐻",
    api_documentation:
      "https://documenter.getpostman.com/view/21884902/UzJQqEYA",
  });
});

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend app URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


app.use("/api/auth", require("./routes/users"));

module.exports = app;
