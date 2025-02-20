const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Wakanda Forever!");
});
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this domain
    methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `The app listening on port http://localhost:${process.env.PORT||3000}`
  );
});
