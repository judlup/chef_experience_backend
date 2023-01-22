import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface GetMealUseCaseInterface {
  execute(id: string): Promise<MealInterface | null>
}
