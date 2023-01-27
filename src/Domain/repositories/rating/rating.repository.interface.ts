import { Meal } from "@/Domain/entities/meal/meal.entity"

export interface RatingRepositoryInterface {
  rating(userid: string, mealId: string, rating: number): Promise<Partial<Meal>>
}
