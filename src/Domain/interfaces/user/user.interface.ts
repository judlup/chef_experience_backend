import { UserRole } from "@/Domain/enums/user/user.enum"

export interface UserInterface {
  id: string
  username: string
  password: string
  role: UserRole
  status?: boolean
  token?: string
  createdAt?: Date
  updatedAt?: Date
}
