import MealController from "@/Infrastructure/Controllers/meal/meal.controller"
import UserMiddleware from "@/Infrastructure/middlewares/user/user.middleware"
import express from "express"
const router = express.Router()
const mealController = new MealController()
const userMiddleware = new UserMiddleware()

router.get("/", userMiddleware.use, mealController.getMeals)
router.get("/:id", userMiddleware.use, mealController.getMeal)
router.put("/:id", userMiddleware.use, mealController.updateMeal)
router.delete("/:id", userMiddleware.use, mealController.deleteMeal)
router.post("/", userMiddleware.use, mealController.addMeal)
router.get("/chef/:id", userMiddleware.use, mealController.getMealsByChef)

export = router
