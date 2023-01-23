import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import { UpdateUserUseCaseInterface } from "@/Domain/usecases/user/updateuser.usecase.interface"

export default class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string, user: UserInterface): Promise<UserInterface> {
    return this.userRepository.updateUser(id, user)
  }
}
