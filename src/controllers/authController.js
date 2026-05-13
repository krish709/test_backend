const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");

const sendResponse = require("../middleware/responseMiddleware");

const AppError = require("../utils/appError");


// REGISTER API
exports.register = async (req, res, next) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;


    // CHECK EMAIL
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {

      return next(
        new AppError("Email already exists", 400)
      );

    }


    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // CREATE USER
    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });


    // TOKEN
    const token = generateToken(user.id);


    return sendResponse(
      res,
      201,
      true,
      "User registered successfully",
      {
        token,
        user,
      }
    );

  } catch (error) {

    next(error);

  }

};



// LOGIN API
exports.login = async (req, res, next) => {

  try {

    const {
      email,
      password
    } = req.body;


    // FIND USER
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {

      return next(
        new AppError("Invalid email or password", 401)
      );

    }


    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return next(
        new AppError("Invalid email or password", 401)
      );

    }


    // TOKEN
    const token = generateToken(user.id);


    return sendResponse(
      res,
      200,
      true,
      "Login successful",
      {
        token,
        user,
      }
    );

  } catch (error) {

    next(error);

  }

};