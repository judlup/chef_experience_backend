import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { UpdateMealUseCaseInterface } from "@/Domain/usecases/meal/updatemeal.usecase.interface"

export default class UpdateMealsUseCase implements UpdateMealUseCaseInterface {
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(id: string, meal: MealInterface): Promise<MealInterface> {
    return this.mealRepository.updateMeal(id, meal)
  }
}
