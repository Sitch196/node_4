const { Sequelize, Op } = require("sequelize");

const { pizza, turtle } = require("../context/index")(Sequelize);

const getAllDistinctPizzas = async (req, res) => {
  try {
    const pizzas = await pizza.findAll({
      attributes: [
        [pizza.sequelize.fn("DISTINCT", pizza.sequelize.col("id")), "id"],
        "name",
        "description",
        "calories",
      ],
    });

    res.json(pizzas);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch distinct pizzas", details: err });
  }
};

const updateHighCaloriePizzas = async (req, res) => {
  try {
    await pizza.update(
      {
        description: pizza.sequelize.literal(
          `CONCAT(description, ' SUPER FAT!')`
        ),
      },
      {
        where: {
          calories: {
            [Op.gt]: 3000,
          },
        },
      }
    );

    const updatedPizzas = await pizza.findAll({
      where: {
        calories: {
          [Op.gt]: 3000,
        },
      },
    });

    res.json({
      message: "High-calorie pizzas updated successfully!",
      pizzas: updatedPizzas,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update pizzas", details: err });
  }
};

const getPizzaById = async (req, res) => {
  try {
    const pizzaId = req.params.id;

    const result = await pizza.findOne({
      where: { id: pizzaId },
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: `Pizza with ID ${pizzaId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pizza", details: err });
  }
};

const addFifthTurtleFavoritePizza = async (req, res) => {
  try {
    const firstFavoritePizzaId = 3;
    const secondFavoritePizzaId = 7;

    const turtleFive = await turtle.findOne({ where: { id: 5 } });

    if (turtleFive) {
      turtleFive.firstFavoritePizzaId = firstFavoritePizzaId;
      turtleFive.secondFavoritePizzaId = secondFavoritePizzaId;

      await turtleFive.save();

      res.json({
        message: "Fifth turtle's favorite pizzas updated successfully",
        turtleFive,
      });
    } else {
      res.status(404).json({ message: "Turtle not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to update turtle's favorite pizzas",
      details: err,
    });
  }
};

module.exports = {
  getAllDistinctPizzas,
  updateHighCaloriePizzas,
  getPizzaById,
  addFifthTurtleFavoritePizza,
};
