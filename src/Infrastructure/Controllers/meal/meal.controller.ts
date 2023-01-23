import AddMealsUseCase from "@/Application/usecases/meal/addmeal.usecase"
import DeleteMealsUseCase from "@/Application/usecases/meal/deletemeal.usecase"
import GetMealUseCase from "@/Application/usecases/meal/getmeal.usecase"
import GetMealsUseCase from "@/Application/usecases/meal/getmeals.usecase"
import UpdateMealsUseCase from "@/Application/usecases/meal/updatemeal.usecase"
import { MealControllerInterface } from "@/Domain/controllers/meal/meal.controller.interface"
import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import MealFakeRepository from "@/Infrastructure/repositories/meal/meal.fake.repository"
import MealRepository from "@/Infrastructure/repositories/meal/meal.repository"
import { Request, Response } from "express"
import { StatusCode } from "status-code-enum"

/* Static data for the fake repository */
const mealFakeRepository = new MealFakeRepository()
/* Replace this with the real repository */
const mealRepository = new MealRepository() // mealFakeRepository

export default class MealController implements MealControllerInterface {
  constructor() {}
  async getMeals(req: Request, res: Response): Promise<Response> {
    const getMealsUseCase = new GetMealsUseCase(mealRepository)
    const meals = await getMealsUseCase.execute()
    return res.status(StatusCode.SuccessOK).json({
      data: meals,
    })
  }
  async getMeal(req: Request, res: Response): Promise<Response> {
    const mealId = req.params.id
    const getMealUseCase = new GetMealUseCase(mealRepository)
    const meal = await getMealUseCase.execute(mealId)
    return res.status(StatusCode.SuccessOK).json({
      data: meal,
    })
  }
  async addMeal(req: Request, res: Response): Promise<Response> {
    const meal: MealInterface = req.body
    const addMealUseCase = new AddMealsUseCase(mealRepository)
    const newMeal = await addMealUseCase.execute(meal)
    return res.status(StatusCode.SuccessOK).json({
      data: newMeal,
    })
  }
  async updateMeal(req: Request, res: Response): Promise<Response> {
    const mealId = req.params.id
    const meal: MealInterface = req.body
    const updateMealUseCase = new UpdateMealsUseCase(mealRepository)
    const updatedMeal = await updateMealUseCase.execute(mealId, meal)
    return res.status(StatusCode.SuccessOK).json({
      data: updatedMeal,
    })
  }
  async deleteMeal(req: Request, res: Response): Promise<Response> {
    const mealId = req.params.id
    const deleteMealUseCase = new DeleteMealsUseCase(mealRepository)
    const deletedMeal = await deleteMealUseCase.execute(mealId)
    return res.status(StatusCode.SuccessOK).json({
      data: deletedMeal,
    })
  }
}
