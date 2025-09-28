module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false, // evita meter un campo vacío
      validate: { // evita strings vacíos 
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
      allowNull: false,
    }
  })
  return user
}