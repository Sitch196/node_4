module.exports = (Sequelize, sequelize) => {
  return sequelize.define("weapons", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    weaponId: {
      type: Sequelize.INTEGER,
    },
    dps: {
      type: Sequelize.INTEGER,
    },
  });
};
