require("dotenv").config();
const Sequelize = require("sequelize");
const { sequelize } = require("./context/index")(Sequelize);

const {
  createTurtle,
  getAllTurtles,
  getTurtlesByFavoritePizza,
} = require("./controllers/turtleControllers");

const {
  getAllDistinctPizzas,
  updateHighCaloriePizzas,
  getPizzaById,
  addFifthTurtleFavoritePizza,
} = require("./controllers/pizzaController");

const { getWeaponsWithHighDPS } = require("./controllers/weaponController");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/turtles", getAllTurtles);
app.post("/turtles", createTurtle);
app.get("/turtles/favorite-pizza", getTurtlesByFavoritePizza);
app.get("/pizza/dinstinct", getAllDistinctPizzas);
app.put("/update-high-calorie-pizzas", updateHighCaloriePizzas);
app.put("/turtles/5/favorites", addFifthTurtleFavoritePizza);
app.get("/pizza/:id", getPizzaById);
app.get("/weapons/high-damage", getWeaponsWithHighDPS);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connected to Database Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`App Running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
