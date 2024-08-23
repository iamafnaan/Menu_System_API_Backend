const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const categoryRoutes = require("./routes/categoryRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const subCategoryRoutes = require("./routes/subCategory");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/subCategory", subCategoryRoutes);

// const PORT = process.env.PORT || 8080;
app.listen(3000);
