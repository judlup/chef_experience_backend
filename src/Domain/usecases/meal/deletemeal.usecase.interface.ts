import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface DeleteMealUseCaseInterface {
  execute(id: string): Promise<MealInterface>
}
