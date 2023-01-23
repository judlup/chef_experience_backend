import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface RegisterUserUseCaseInterface {
  execute(user: UserInterface): Promise<UserInterface>
}
