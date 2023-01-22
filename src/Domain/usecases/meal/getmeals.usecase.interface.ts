import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface GetMealsUseCaseInterface {
  execute(): Promise<MealInterface[]>
}
