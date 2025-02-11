const { Sequelize } = require("sequelize");
require('dotenv').config();

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const connectDatabase = async () => {
  try {
    await dbConnection.authenticate();
    console.log("Database connection established.");
  } 
  catch (error) {
    console.error("Database connection failed:", error);
  }
};

connectDatabase();

module.exports = dbConnection;