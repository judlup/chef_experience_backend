import RatingController from "@/Infrastructure/Controllers/rating/rating.controller"
import UserMiddleware from "@/Infrastructure/middlewares/user/user.middleware"
import express from "express"
const router = express.Router()
const ratingController = new RatingController()
const userMiddleware = new UserMiddleware()

router.post("/", userMiddleware.use, ratingController.rating)

export = router
