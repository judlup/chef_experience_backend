import { Meal } from "@/Domain/entities/meal/meal.entity"
import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import dataSource from "@/Infrastructure/database/mysql/mysql.config"
import { uuid } from "uuidv4"

export default class MealRepository implements MealRepositoryInterface {
  // get all meals
  async getMeals(): Promise<MealInterface[]> {
    const meals = await dataSource
      .getRepository(Meal)
      .find({ where: { status: true } })
    return meals
  }
  // get a meal
  async getMeal(id: string): Promise<MealInterface> {
    const meal = await dataSource
      .getRepository(Meal)
      .findOne({ where: { id: id, status: true } })
    if (!meal) {
      throw new Error("Meal not found")
    }
    return meal
  }
  // update a meal
  async updateMeal(id: string, meal: MealInterface): Promise<MealInterface> {
    const mealData = await dataSource.getRepository(Meal).findOneBy({
      id: id,
      status: true,
    })
    if (!mealData) {
      throw new Error("Meal not found")
    }
    dataSource.getRepository(Meal).merge(mealData, meal)
    const mealUpdated = await dataSource.getRepository(Meal).save(mealData)
    return mealUpdated
  }
  // delete a meal
  async deleteMeal(id: string): Promise<MealInterface> {
    const mealData = await dataSource.getRepository(Meal).findOneBy({
      id: id,
      status: true,
    })
    if (!mealData) {
      throw new Error("Meal not found")
    }
    dataSource.getRepository(Meal).merge(mealData, { status: false })
    const mealUpdated = await dataSource.getRepository(Meal).save(mealData)
    return mealUpdated
  }
  // add a meal
  async addMeal(meal: MealInterface): Promise<MealInterface> {
    meal.id = uuid()
    meal.createdAt = new Date()
    meal.updatedAt = new Date()
    const newMeal = dataSource.getRepository(Meal).create(meal)
    const results = await dataSource.getRepository(Meal).save(newMeal)
    return results
  }
  // get a meal by chef
  async getMealsByChefId(chefId: string): Promise<MealInterface[]> {
    const meals = await dataSource
      .getRepository(Meal)
      .find({ where: { chef_id: chefId, status: true } })
    return meals
  }
}
