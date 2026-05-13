const User = require("../models/User");

exports.getUsers = async (
  req,
  res
) => {

  res.json({
    message: "All Users"
  });

};


exports.getUser = async (
  req,
  res
) => {

  res.json({
    message: "Single User"
  });

};


exports.createUser = async (
  req,
  res
) => {

  res.json({
    message: "User Created"
  });

};


exports.updateUser = async (
  req,
  res
) => {

  res.json({
    message: "User Updated"
  });

};


exports.deleteUser = async (
  req,
  res
) => {

  res.json({
    message: "User Deleted"
  });

};


// ✅ THIS IS IMPORTANT
exports.profile = async (
  req,
  res
) => {

  res.json({

    success: true,

    data: req.user

  });

};