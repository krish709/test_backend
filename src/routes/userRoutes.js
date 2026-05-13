const express = require("express");

const router = express.Router();

const userController = require(
  "../controllers/userController"
);

const authController = require(
  "../controllers/authController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);


console.log("middle",authMiddleware);

console.log("controller",userController.profile);
// ================= AUTH =================

// REGISTER
router.post(
  "/register",
  authController.register
);


// LOGIN
router.post(
  "/login",
  authController.login
);


// PROFILE
router.get(
  "/profile",
  authMiddleware,
  userController.profile
);


// ================= USERS =================

// GET ALL USERS
router.get(
  "/",
  userController.getUsers
);


// GET SINGLE USER
router.get(
  "/:id",
  userController.getUser
);


// CREATE USER
router.post(
  "/createUser",
  userController.createUser
);


// UPDATE USER
router.put(
  "/:id",
  userController.updateUser
);


// DELETE USER
router.delete(
  "/:id",
  userController.deleteUser
);


module.exports = router;