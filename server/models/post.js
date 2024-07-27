const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    privateStatus: {
      type: DataTypes.BOOLEAN,
    },
  }),
};
