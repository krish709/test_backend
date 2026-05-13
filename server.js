require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./src/config/db");

require("./src/models/User");

const userRoutes = require("./src/routes/userRoutes");

const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/users", userRoutes);


// Error Middleware (MUST BE LAST)
app.use(errorHandler);


// Database Connection
sequelize.sync()
  .then(() => {

    console.log("Database Connected");

    app.listen(process.env.PORT, () => {

      console.log(
        `Server Running on ${process.env.PORT}`
      );

    });

  })
  .catch((err) => {

    console.log(err);

  });