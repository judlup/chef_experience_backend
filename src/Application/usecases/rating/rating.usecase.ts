import { Rating } from "@/Domain/entities/rating/rating.entity"
import { RatingRepositoryInterface } from "@/Domain/repositories/rating/rating.repository.interface"
import { RatingUseCaseInterface } from "@/Domain/usecases/rating/rating.usecase"

export default class RatingUseCase implements RatingUseCaseInterface {
  constructor(private readonly ratingRepository: RatingRepositoryInterface) {}

  async execute(
    userId: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Rating>> {
    return this.ratingRepository.rating(userId, mealId, rating)
  }
}
