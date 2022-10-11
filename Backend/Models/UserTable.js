const dbConn = require('../Config/dbConfig')
const Sequelize = require('sequelize');

const Table = dbConn.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  office: {
    type: Sequelize.ENUM("admin", "docente"),
    allowNull: false,
  }
});
module.exports = Table;
