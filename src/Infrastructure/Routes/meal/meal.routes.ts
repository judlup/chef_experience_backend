import MealController from "@/Infrastructure/Controllers/meal/meal.controller"
import express from "express"
const router = express.Router()
const mealController = new MealController()

router.get("/", mealController.getMeals)
router.get("/:id", mealController.getMeal)
router.put("/:id", mealController.updateMeal)
router.delete("/:id", mealController.deleteMeal)
router.post("/", mealController.addMeal)

export = router
