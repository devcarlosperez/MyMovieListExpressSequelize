module.exports = (sequelize, Sequelize) => {
  const movie = sequelize.define("movie", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    poster: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    released: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    runTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    director: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actors: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    plot: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return movie;
};
