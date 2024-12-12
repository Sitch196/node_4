const Sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "turtles",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weaponId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      firstFavoritePizzaId: {
        type: Sequelize.INTEGER,
      },
      secondFavoritePizzaId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
