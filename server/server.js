const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRouter");
const passRouter = require("./routes/passRouter");

require("dotenv").config();
require('./models/db_conn');

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(
  cors({
    origin: process.env.frontend_url,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.listen(port, () => {
  console.log(
    `The app listening on port http://localhost:${port}`
  );
});

app.use(bodyParser.json());
app.use('/auth', authRouter);
// app.use('/pass', passRouter);