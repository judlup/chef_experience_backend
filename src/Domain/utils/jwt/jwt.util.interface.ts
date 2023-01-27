import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface JwtUtilInterface {
  sign(user: Partial<UserInterface>): Promise<string>
  verify(token: string): Promise<Partial<UserInterface>>
}
