import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import { MealRepositoryInterface } from "@/Domain/repositories/meal/meal.repository.interface"
import { AddMealUseCaseInterface } from "@/Domain/usecases/meal/addneal.usecase.interface"

export default class AddMealsUseCase implements AddMealUseCaseInterface {
  constructor(private readonly mealRepository: MealRepositoryInterface) {}

  async execute(meal: MealInterface): Promise<MealInterface> {
    return this.mealRepository.addMeal(meal)
  }
}
