import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface UpdateUserUseCaseInterface {
  execute(id: string, user: UserInterface): Promise<UserInterface>
}
