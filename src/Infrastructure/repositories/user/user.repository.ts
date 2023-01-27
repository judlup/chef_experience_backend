import { User } from "@/Domain/entities/user/user.entity"
import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { UserRepositoryInterface } from "@/Domain/repositories/user/meal.repository.interface"
import dataSource from "@/Infrastructure/database/mysql/mysql.config"
import JwtUtil from "@/Infrastructure/utils/jwt/jwt.util"
import { uuid } from "uuidv4"

export default class UserRepository implements UserRepositoryInterface {
  // get all users
  async getUsers(): Promise<UserInterface[]> {
    const users = await dataSource
      .getRepository(User)
      .find({ where: { status: true } })
    return users
  }
  // get an user
  async getUser(id: string): Promise<UserInterface> {
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id: id, status: true } })
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
  // update an user (role)
  async updateUser(id: string, user: UserInterface): Promise<UserInterface> {
    const userData = await dataSource.getRepository(User).findOneBy({
      id: id,
      status: true,
    })
    if (!userData) {
      throw new Error("User not found")
    }
    dataSource.getRepository(User).merge(userData, { role: user.role })
    const userUpdated = await dataSource.getRepository(User).save(userData)
    return userUpdated
  }
  // delete an user
  async deleteUser(id: string): Promise<UserInterface> {
    const userData = await dataSource.getRepository(User).findOneBy({
      id: id,
      status: true,
    })
    if (!userData) {
      throw new Error("User not found")
    }
    dataSource.getRepository(User).merge(userData, { status: false })
    const userUpdated = await dataSource.getRepository(User).save(userData)
    return userUpdated
  }
  // register an user
  async registerUser(user: UserInterface): Promise<UserInterface> {
    user.id = uuid()
    user.createdAt = new Date()
    user.updatedAt = new Date()
    const newUser = dataSource.getRepository(User).create(user)
    const results = await dataSource.getRepository(User).save(newUser)
    return results
  }

  // login an user
  async loginUser(
    username: string,
    password: string
  ): Promise<Partial<UserInterface>> {
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { username: username, status: true } })
    if (!user) {
      throw new Error("User not found")
    }
    const isMatch = await User.comparePasswords(password, user.password)
    if (!isMatch) {
      throw new Error("Incorrect password")
    }

    const jwtUtil = new JwtUtil()
    const token = await jwtUtil.sign(user)

    return { token: token }
  }
}
