import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import mealData from "./meal.fake.data.json"

export default class MealFakeRepository implements MealRepositoryInterface {
  // get all meals
  async getMeals(): Promise<MealInterface[]> {
    return mealData
  }
  // get a meal
  async getMeal(id: string): Promise<MealInterface> {
    if (!mealData.find((meal) => meal.id === id)) {
      throw new Error("Meal not found")
    }
    return mealData.find((meal) => meal.id === id) as MealInterface
  }
  // update a meal
  async updateMeal(id: string, meal: MealInterface): Promise<MealInterface> {
    let index = mealData.findIndex((meal) => meal.id === id)
    mealData[index] = meal
    return mealData[index]
  }
  // delete a meal
  async deleteMeal(id: string): Promise<MealInterface> {
    let index = mealData.findIndex((meal) => meal.id === id)
    let meal = mealData[index]
    mealData.splice(index, 1)
    return meal
  }
  // add a meal
  async addMeal(meal: MealInterface): Promise<MealInterface> {
    mealData.push(meal)
    return meal
  }
}
