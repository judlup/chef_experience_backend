import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface LoginUserUseCaseInterface {
  execute(username: string, password: string): Promise<Partial<UserInterface>>
}
