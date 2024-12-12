require("dotenv").config();

module.exports = (Sequelize) => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );

  const turtle = require("../models/turtle.js")(Sequelize, sequelize);
  const weapon = require("../models/weapon.js")(Sequelize, sequelize);
  const pizza = require("../models/pizza.js")(Sequelize, sequelize);

  turtle.belongsTo(weapon, {
    foreignKey: "weaponId",
    as: "weapon",
  });

  weapon.hasOne(turtle, {
    foreignKey: "weaponId",
    as: "turtle",
  });

  turtle.belongsTo(pizza, {
    foreignKey: "firstFavoritePizzaId",
    as: "firstFavoritePizza",
  });

  turtle.belongsTo(pizza, {
    foreignKey: "secondFavoritePizzaId",
    as: "secondFavoritePizza",
  });

  return {
    sequelize,
    turtle,
    weapon,
    pizza,
  };
};
