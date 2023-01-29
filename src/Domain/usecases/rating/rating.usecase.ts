import { Rating } from "@/Domain/entities/rating/rating.entity"

export interface RatingUseCaseInterface {
  execute(
    userId: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Rating>>
}
