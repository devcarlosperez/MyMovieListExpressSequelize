const db = require("../models")
const Movie = db.movies
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  const movie = {
    name: req.body.name,
    rating: req.body.rating
  }

  Movie.create(movie).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while creating the movie."
    })
  })
}

exports.findAll = (req, res) => {
  Movie.findAll().then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while retrieving movies."
    })
  })
}

exports.findOne = (req, res) => {
  const movieId = req.params.id

  Movie.findOne({ where: {id: movieId} })
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving the movie."
      })
    })
}

exports.update = (req, res) => {
  const movieId = req.params.id
  const movie = {
    name: req.body.name,
    rating: req.body.rating
  }

  Movie.update(movie, {where: {id: movieId} })
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while updating the movie."
      })
    })
}

exports.delete = (req, res) => {
  const movieId = req.params.id

  Movie.destroy({ where: {id: movieId} })
    .then(data => {
      res.send({
        message: "Movie has been deleted."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the movie."
      });
    });
}