import { Meal } from "@/Domain/entities/meal/meal.entity"
import { Rating } from "@/Domain/entities/rating/rating.entity"
import { RatingRepositoryInterface } from "@/Domain/repositories/rating/rating.repository.interface"
import dataSource from "@/Infrastructure/database/mysql/mysql.config"

export default class RatingRepository implements RatingRepositoryInterface {
  // The user rating is overriting previous rating every time
  async rating(
    userid: string,
    mealId: string,
    rating: number
  ): Promise<Partial<Meal>> {
    // Validate if the meal exists
    const getMeal = new Meal()
    getMeal.id = mealId

    const validation = await dataSource
      .getRepository(Meal)
      .findOne({ where: { id: getMeal.id }, relations: ["ratings"] })
    // Validate if the user has already rated the meal
    if (validation?.ratings.some((rating) => rating.userId === userid)) {
      await dataSource.getRepository(Rating).delete({
        userId: userid,
        mealId: mealId,
      })
    }
    // Add the rating
    const newRating = new Rating()
    newRating.rating = rating
    newRating.userId = userid
    newRating.mealId = mealId

    getMeal.addRating(newRating)

    // Save the rating usign meal relationship many to many
    let result = await dataSource.getRepository(Meal).save(getMeal)

    return result
  }
}
