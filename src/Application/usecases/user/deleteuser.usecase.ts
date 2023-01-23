import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { DeleteUserUseCaseInterface } from "@/Domain/usecases/user/deleteuser.usecase.interface"

export default class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserInterface> {
    return this.userRepository.deleteUser(id)
  }
}
