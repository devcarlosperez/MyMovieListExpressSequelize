const db = require("../models")
const userObject = db.users
const op = db.Sequelize.Op

exports.create = (req, res) => {
  const userName = req.body.userName
  const email = req.body.email
  const password = req.body.password

  const user = {
    userName: userName,
    email: email,
    password: password
  }

  userObject.create(user).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error ocurred while creating the user.",
    })
  })
}

exports.findAll = (req, res) => {
  userObject.findAll().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error ocurred while retrieving users.",
    })
  })
}

exports.findOne = (req, res) => {
  const userId = req.params.id

  userObject.findOne({ where: { id: userId}})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error ocurred while retrieving the user.",
    })
  })
}

exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  userObject.findOne({ where: { email } })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    res.send({id: user.id, userName: user.userName, email: user.email});
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.update = (req, res) => {
  const userId = req.params.id
  const userName = req.body.userName
  const email = req.body.email
  const password = req.body.password

  const user = {
    userName: userName,
    email: email,
    password: password
  }

  userObject.update(user, { where: { id: userId}})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error ocurred while updating the user.",
    })
  })
}

exports.delete = (req, res) => {
  const userId = req.params.id

  userObject.destroy({ where: { id: userId}})
  .then((data) => {
    res.send({
      message: "User has been deleted.",
    })
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error ocurred while deleting the user.",
    })
  })
}