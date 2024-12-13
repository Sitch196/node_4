const { Sequelize, Op } = require("sequelize");
const { weapon } = require("../context/index")(Sequelize);

const getWeaponsWithHighDPS = async (req, res) => {
  try {
    const weapons = await weapon.findAll({
      where: {
        dps: {
          [Sequelize.Op.gt]: 100,
        },
      },
    });

    res.json({
      count: weapons.length,
      weapons: weapons,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weapons", details: err });
  }
};

module.exports = { getWeaponsWithHighDPS };
