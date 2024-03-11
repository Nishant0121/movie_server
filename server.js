const express = require("express");
require("dotenv").config();
const movieRoutes = require("./routes/movies");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/movies", movieRoutes);

mongoose
  .connect(process.env.MONGOURI)
  .then(async () => {
    await console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log("server is running on port 4000!!");
});
