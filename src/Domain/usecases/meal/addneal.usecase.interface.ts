import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface AddMealUseCaseInterface {
  execute(meal: MealInterface): Promise<MealInterface>
}
