import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { GetUserUseCaseInterface } from "@/Domain/usecases/user/getuser.usecase.interface"

export default class GetUserUseCase implements GetUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserInterface> {
    return this.userRepository.getUser(id)
  }
}
