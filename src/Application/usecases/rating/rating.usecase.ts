import { Meal } from "@/Domain/entities/meal/meal.entity"
import { RatingRepositoryInterface } from "@/Domain/repositories/rating/rating.repository.interface"
import { RatingUseCaseInterface } from "@/Domain/usecases/rating/rating.usecase"

export default class RatingUseCase implements RatingUseCaseInterface {
  constructor(private readonly ratingRepository: RatingRepositoryInterface) {}

  async execute(
    userId: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Meal>> {
    return this.ratingRepository.rating(userId, mealId, rating)
  }
}
