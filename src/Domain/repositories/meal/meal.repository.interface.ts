import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface MealRepositoryInterface {
  getMeals(): Promise<MealInterface[]>
  getMeal(id: string): Promise<MealInterface>
  updateMeal(id: string, meal: MealInterface): Promise<MealInterface>
  deleteMeal(id: string): Promise<MealInterface>
  addMeal(meal: MealInterface): Promise<MealInterface>
  getMealsByChefId(chefId: string): Promise<MealInterface[]>
}
