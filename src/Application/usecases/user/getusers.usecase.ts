import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { GetUsersUseCaseInterface } from "@/Domain/usecases/user/getusers.usecase.interface"

export default class GetUsersUseCase implements GetUsersUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(): Promise<UserInterface[]> {
    return this.userRepository.getUsers()
  }
}
