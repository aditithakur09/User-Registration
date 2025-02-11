const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const UserRegistration = dbConnection.define("User Registration", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const syncUserRegistration = async () => {
  try {
    await dbConnection.sync();
    console.log("User Registration page synced.");
  } catch (error) {
    console.error("Page sync error:", error);
  }
};

syncUserRegistration();

module.exports = UserRegistration;
