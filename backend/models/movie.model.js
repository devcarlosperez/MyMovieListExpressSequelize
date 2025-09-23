module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    name: {
      type: Sequelize.STRING,
      allowNull: false, // evita meter un campo vacío
      validate: {
        notEmpty: true   // evita strings vacíos
      }
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
    }
  })
  
  return Movie
}