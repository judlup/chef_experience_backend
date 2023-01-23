import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface DeleteUserUseCaseInterface {
  execute(id: string): Promise<UserInterface>
}
