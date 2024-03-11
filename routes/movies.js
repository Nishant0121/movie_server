const express = require("express");
const router = express.Router();
const Movie = require("../models/moviemodel");
const {
  createMovies,
  getMovie,
  getMovies,
  deleteMovie,
  updateMovie,
} = require("../controllers/moviecontroller");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovies);
router.delete("/:id", deleteMovie);
router.patch("/:id", updateMovie);

module.exports = router;
