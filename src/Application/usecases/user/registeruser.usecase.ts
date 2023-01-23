import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { RegisterUserUseCaseInterface } from "@/Domain/usecases/user/registeruser.usecase.interface"

export default class RegisterUserUseCase
  implements RegisterUserUseCaseInterface
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(user: UserInterface): Promise<UserInterface> {
    return this.userRepository.registerUser(user)
  }
}
