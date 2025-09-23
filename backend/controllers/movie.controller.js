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
  
}

exports.update = (req, res) => {
  
}

exports.delete = (req, res) => {
  
}