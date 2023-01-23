import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface GetUserUseCaseInterface {
  execute(id: string): Promise<UserInterface>
}
