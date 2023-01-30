import { UserInterface } from "@/Domain/interfaces/user/user.interface"

export interface UserRepositoryInterface {
  getUsers(): Promise<UserInterface[]>
  getUser(id: string): Promise<UserInterface>
  updateUser(id: string, user: UserInterface): Promise<UserInterface>
  deleteUser(id: string): Promise<UserInterface>
  registerUser(user: UserInterface): Promise<UserInterface>
  loginUser(username: string, password: string): Promise<Partial<UserInterface>>
  getChefs(): Promise<UserInterface[]>
}
