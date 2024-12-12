const Sequelize = require("sequelize");
const { sequelize } = require("./context/index")(Sequelize);
const {
  createTurtle,
  getAllTurtles,
  getTurtlesByFavoritePizza,
} = require("./controllers/turtleControllers");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/turtles", getAllTurtles);
app.post("/turtles", createTurtle);
app.get("/turtles/favorite-pizza", getTurtlesByFavoritePizza);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connected to Postgres Successfully");
    app.listen(3000, () => {
      console.log("App Running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
