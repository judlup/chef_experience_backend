import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { GetChefsUseCaseInterface } from "@/Domain/usecases/user/getchefs.usecase.interface"

export default class GetChefsUseCase implements GetChefsUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(): Promise<UserInterface[]> {
    return this.userRepository.getChefs()
  }
}
