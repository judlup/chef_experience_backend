import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { GetMealsByChefUseCaseInterface } from "@/Domain/usecases/meal/getmealsbychef.usecase.interface"

export default class GetMealsByChefUseCase
  implements GetMealsByChefUseCaseInterface
{
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(chefId: string): Promise<MealInterface[]> {
    return this.mealRepository.getMealsByChefId(chefId)
  }
}
