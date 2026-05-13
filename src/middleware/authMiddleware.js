const jwt = require("jsonwebtoken");

const User = require("../models/User");

const AppError = require("../utils/appError");


const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token =
        req.headers.authorization.split(" ")[1];

    }


    // TOKEN NOT FOUND
    if (!token) {

      return next(
        new AppError(
          "Token not found",
          401
        )
      );

    }


    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      "mysecretkey"
    );


    // FIND USER
    const user = await User.findByPk(
      decoded.id
    );


    // USER NOT FOUND
    if (!user) {

      return next(
        new AppError(
          "User not found",
          404
        )
      );

    }


    // STORE USER
    req.user = user;

    next();

  } catch (error) {

    next(
      new AppError(
        "Invalid token",
        401
      )
    );

  }

};

module.exports = authMiddleware;