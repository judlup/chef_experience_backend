import { UserInterface } from "../user/user.interface"

export interface MealInterface {
  id: string
  name: string
  description: string
  price: number
  image: string
  chef_id: string
  user?: Partial<UserInterface>
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}
