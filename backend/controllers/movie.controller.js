const db = require("../models")
const movieObject = db.movies
const op = db.Sequelize.Op

exports.create = (req, res) => {
  const movie = {
    name: req.body.name,
    rating: req.body.rating
  }

  movieObject.create(movie).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while creating the movie."
    })
  })
}

exports.findAll = (req, res) => {
  movieObject.findAll().then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while retrieving movies."
    })
  })
}

exports.findOne = (req, res) => {
  const movieId = req.params.id

  movieObject.findOne({ where: {id: movieId} })
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

  movieObject.update(movie, {where: {id: movieId} })
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

  movieObject.destroy({ where: {id: movieId} })
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