import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"

export interface GetMealsByChefUseCaseInterface {
  execute(chefId: string): Promise<MealInterface[]>
}
