const Movie = require("../models/moviemodel");
const mongoose = require("mongoose");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 });

    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Movie not found" });
  }
  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMovies = async (req, res) => {
  const { title, director, year, genre, description } = req.body;
  try {
    const movie = await Movie.create({
      title,
      director,
      year,
      genre,
      description,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Movie not found" });
  }
  try {
    const movie = await Movie.findOneAndDelete(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Movie not found" });
  }
  try {
    const movie = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMovies,
  getMovies,
  getMovie,
  deleteMovie,
  updateMovie,
};
