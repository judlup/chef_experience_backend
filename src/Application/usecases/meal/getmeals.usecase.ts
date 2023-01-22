import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { GetMealsUseCaseInterface } from "@/Domain/usecases/meal/getmeals.usecase.interface"

export default class GetMealsUseCase implements GetMealsUseCaseInterface {
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(): Promise<MealInterface[]> {
    return this.mealRepository.getMeals()
  }
}
