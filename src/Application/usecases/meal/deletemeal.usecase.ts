import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { DeleteMealUseCaseInterface } from "@/Domain/usecases/meal/deletemeal.usecase.interface"

export default class DeleteMealsUseCase implements DeleteMealUseCaseInterface {
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(id: string): Promise<MealInterface> {
    return this.mealRepository.deleteMeal(id)
  }
}
