import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { LoginUserUseCaseInterface } from "@/Domain/usecases/user/loginuser.usecase.interface"

export default class LoginUserUseCase implements LoginUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(
    username: string,
    password: string
  ): Promise<Partial<UserInterface>> {
    return this.userRepository.loginUser(username, password)
  }
}
