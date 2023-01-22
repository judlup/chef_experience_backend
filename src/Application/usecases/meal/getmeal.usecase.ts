import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { GetMealUseCaseInterface } from "@/Domain/usecases/meal/getmeal.usecase.interface"

export default class GetMealUseCase implements GetMealUseCaseInterface {
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(id: string): Promise<MealInterface | null> {
    return this.mealRepository.getMeal(id)
  }
}
