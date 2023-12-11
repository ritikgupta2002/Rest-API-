const express = require("express");
const router = express.Router();
const {
  HandleGetAllUsers,
  HandleGetUserById,
  HandleUpdateUserById,
  HandleDeleteUserById,
  HandleCreateUser,
} = require("../controllers/user.js");

//get all users
//Create a user
router
  .route("/")
  .get(HandleGetAllUsers)
  .post(HandleCreateUser);

//get a user by id
//update a user by id
// delete a user by id
router
  .route("/:id")
  .get(HandleGetUserById)
  .patch(HandleUpdateUserById)
  .delete(HandleDeleteUserById);

module.exports = router;
