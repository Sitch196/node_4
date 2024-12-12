const { Sequelize } = require("sequelize");

const { turtle, pizza } = require("../context/index")(Sequelize);

const createTurtle = async ({ body }, res) => {
  try {
    const newTurtle = await turtle.create(body);
    res.json(newTurtle);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllTurtles = async (req, res) => {
  try {
    const turtles = await turtle.findAll();
    res.json(turtles);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTurtlesByFavoritePizza = async (req, res) => {
  try {
    const mozzarellaPizza = await pizza.findOne({
      where: { name: "Mozzarela" },
    });

    if (!mozzarellaPizza) {
      return res.status(404).json({ message: "Mozzarella pizza not found" });
    }

    const turtles = await turtle.findAll({
      where: {
        [Sequelize.Op.or]: [
          { firstFavoritePizzaId: mozzarellaPizza.id },
          { secondFavoritePizzaId: mozzarellaPizza.id },
        ],
      },
      include: [
        { model: pizza, as: "firstFavoritePizza" },
        { model: pizza, as: "secondFavoritePizza" },
      ],
    });

    res.json(turtles);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createTurtle,
  getAllTurtles,
  getTurtlesByFavoritePizza,
};
