const Sequelize = require("sequelize");
const { sequelize, turtle } = require("./context/index")(Sequelize);
const express = require("express");
const app = express();

app.use(express.json());

app.post("/turtle", async ({ body }, res) => {
  try {
    const newTurtle = await turtle.create(body);
    res.json(newTurtle);
  } catch (err) {
    res.status(500).json(err);
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Connected to Postgres Successfully");
    app.listen(3000, () => {
      console.log("App Running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
