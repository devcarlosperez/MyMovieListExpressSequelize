const db = require("../models")
const axios = require("axios")
const movieObject = db.movies
const op = db.Sequelize.Op

exports.create = async (req, res) => {
  const userTitle = req.body.name
  const userRating = req.body.rating

  // Petición a OMDB para obtener los datos de la película
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ce2589c3",
      t: userTitle,
    },
  });

  // Almacenar la respuesta en una constante
  const omdbData = response.data

  if (omdbData.Response === "False") {
    return res.status(404).send({ message: "Movie not found in OMDb" });
  }

  const movie = {
    name: userTitle,
    rating: userRating,
    poster: omdbData.Poster,
    year: omdbData.Year,
    released: omdbData.Released,
    runTime: omdbData.Runtime,
    genre: omdbData.Genre,
    director: omdbData.Director,
    actors: omdbData.Actors,
    language: omdbData.Language,
    country: omdbData.Country,
    plot: omdbData.Plot,
  }

  movieObject
    .create(movie)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the movie.",
      })
    })
}

exports.findAll = (req, res) => {
  movieObject
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving movies.",
      })
    })
}

exports.findOne = (req, res) => {
  const movieId = req.params.id

  movieObject
    .findOne({ where: { id: movieId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving the movie.",
      })
    })
}

exports.update = async (req, res) => {
  const movieId = req.params.id
  const userTitle = req.body.name
  const userRating = req.body.rating

  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ce2589c3",
      t: userTitle,
    }
  })

  const omdbData = response.data

  if (omdbData.Response === "False") {
    return res.status(404).send({ message: "Movie not found in OMDb" })
  }

  const movie = {
    name: userTitle,
    rating: userRating,
    poster: omdbData.Poster,
    year: omdbData.Year,
    released: omdbData.Released,
    runTime: omdbData.Runtime,
    genre: omdbData.Genre,
    director: omdbData.Director,
    actors: omdbData.Actors,
    language: omdbData.Language,
    country: omdbData.Country,
    plot: omdbData.Plot,
  }

  movieObject
    .update(movie, { where: { id: movieId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while updating the movie.",
      })
    })
}

exports.delete = (req, res) => {
  const movieId = req.params.id;

  movieObject
    .destroy({ where: { id: movieId } })
    .then((data) => {
      res.send({
        message: "Movie has been deleted.",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the movie.",
      })
    })
}