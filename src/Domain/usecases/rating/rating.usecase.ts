import { Meal } from "@/Domain/entities/meal/meal.entity"

export interface RatingUseCaseInterface {
  execute(
    userId: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Meal>>
}
