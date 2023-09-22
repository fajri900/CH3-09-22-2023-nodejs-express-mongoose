const express = require("express")
const userController = require("../constrollers/userControllers")
const router = express.Router()

// baca data dari file json

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.editUser)
  .delete(userController.removeUser)

module.exports = router
