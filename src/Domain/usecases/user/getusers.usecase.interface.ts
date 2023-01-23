import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface GetUsersUseCaseInterface {
  execute(): Promise<UserInterface[]>
}
