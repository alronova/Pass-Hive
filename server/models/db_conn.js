const mongoose = require("mongoose");
require("dotenv").config();

url = process.env.mongo_url;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ", err);
  });
