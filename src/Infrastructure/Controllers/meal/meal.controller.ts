import AddMealsUseCase from "@/Application/usecases/meal/addmeal.usecase"
import DeleteMealsUseCase from "@/Application/usecases/meal/deletemeal.usecase"
import GetMealUseCase from "@/Application/usecases/meal/getmeal.usecase"
import GetMealsUseCase from "@/Application/usecases/meal/getmeals.usecase"
import GetMealsByChefUseCase from "@/Application/usecases/meal/getmealsbychef.usecase"
import UpdateMealsUseCase from "@/Application/usecases/meal/updatemeal.usecase"
import { MealControllerInterface } from "@/Domain/controllers/meal/meal.controller.interface"
import { UserRole } from "@/Domain/enums/user/user.enum"
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
    const userAuth = req.body.userAuth
    if (!userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not logged in",
      })
    }
    const getMealsUseCase = new GetMealsUseCase(mealRepository)
    try {
      const meals = await getMealsUseCase.execute()
      return res.status(StatusCode.SuccessOK).json({
        data: meals,
      })
    } catch (err) {
      return res.status(StatusCode.ServerErrorInternal).json({
        message: "Internal Server Error",
      })
    }
  }
  async getMeal(req: Request, res: Response): Promise<Response> {
    const userAuth = req.body.userAuth
    if (!userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not logged in",
      })
    }
    const mealId = req.params.id
    const getMealUseCase = new GetMealUseCase(mealRepository)
    try {
      const meal = await getMealUseCase.execute(mealId)
      return res.status(StatusCode.SuccessOK).json({
        data: meal,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).json({
        message: "Not found",
      })
    }
  }
  async addMeal(req: Request, res: Response): Promise<Response> {
    const meal: MealInterface = req.body
    const userAuth = req.body.userAuth
    if (userAuth.role === UserRole.USER) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not authorized to add a meal",
      })
    }
    const addMealUseCase = new AddMealsUseCase(mealRepository)
    try {
      const newMeal = await addMealUseCase.execute(meal)
      return res.status(StatusCode.SuccessCreated).json({
        data: newMeal,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "Bad Request",
      })
    }
  }
  async updateMeal(req: Request, res: Response): Promise<Response> {
    const mealId = req.params.id
    const meal: MealInterface = req.body
    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      if (userAuth.role !== UserRole.CHEF && userAuth.id !== meal.chef_id) {
        return res.status(StatusCode.ClientErrorForbidden).json({
          message: "You are not authorized to update this meal",
        })
      }
    }
    const updateMealUseCase = new UpdateMealsUseCase(mealRepository)
    try {
      const updatedMeal = await updateMealUseCase.execute(mealId, meal)
      return res.status(StatusCode.SuccessOK).json({
        data: updatedMeal,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "Bad Request",
      })
    }
  }
  async deleteMeal(req: Request, res: Response): Promise<Response> {
    const mealId = req.params.id
    const getMealUseCase = new GetMealUseCase(mealRepository)
    let meal
    try {
      meal = await getMealUseCase.execute(mealId)
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).json({
        message: "Meal not found",
      })
    }
    if (!meal)
      return res.status(StatusCode.ClientErrorNotFound).json({
        message: "Meal not found",
      })

    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      if (userAuth.role !== UserRole.CHEF && userAuth.id !== meal.chef_id) {
        return res.status(StatusCode.ClientErrorForbidden).json({
          message: "You are not authorized to delete this meal",
        })
      }
    }
    const deleteMealUseCase = new DeleteMealsUseCase(mealRepository)
    try {
      const deletedMeal = await deleteMealUseCase.execute(mealId)
      return res.status(StatusCode.SuccessOK).json({
        data: deletedMeal,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "Bad Request",
      })
    }
  }

  async getMealsByChef(req: Request, res: Response): Promise<Response> {
    const userAuth = req.body.userAuth
    if (!userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not logged in",
      })
    }
    const chefId = req.params.id
    const getMealsByChefUseCase = new GetMealsByChefUseCase(mealRepository)
    try {
      const meal = await getMealsByChefUseCase.execute(chefId)
      return res.status(StatusCode.SuccessOK).json({
        data: meal,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).json({
        message: "Not found",
      })
    }
  }
}
