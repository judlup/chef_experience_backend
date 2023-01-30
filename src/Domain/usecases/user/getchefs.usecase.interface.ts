import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface GetChefsUseCaseInterface {
  execute(): Promise<UserInterface[]>
}
