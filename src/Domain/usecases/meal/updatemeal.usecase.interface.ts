import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface UpdateMealUseCaseInterface {
  execute(id: string, meal: MealInterface): Promise<MealInterface>
}
