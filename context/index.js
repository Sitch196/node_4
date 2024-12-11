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

  return {
    sequelize,
    turtle,
    weapon,
    pizza,
  };
};
