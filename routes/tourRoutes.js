const express = require("express")
const tourController = require("../constrollers/toursControllers")

const router = express.Router()

// router.param("id", tourController.checkId)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    tourController.checkBody,
    tourController.createTour
  )

router
  .route("/model")
  .post(tourController.createTourModel)

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.editTourModels)
  .delete(tourController.removeTourModels)

module.exports = router
