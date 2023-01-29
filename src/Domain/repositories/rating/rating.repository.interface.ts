import { Rating } from "@/Domain/entities/rating/rating.entity"

export interface RatingRepositoryInterface {
  rating(
    userid: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Rating>>
}
