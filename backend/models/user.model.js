module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
      allowNull: false,
    },
  });
  return user;
};
