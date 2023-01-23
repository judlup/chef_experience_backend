export interface MealInterface {
  id: string
  name: string
  description: string
  price: number
  image: string
  chef_id: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}
