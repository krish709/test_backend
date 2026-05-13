require("dotenv").config();

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL Connected ✅"))
  .catch((err) => console.error(err));

module.exports = sequelize;