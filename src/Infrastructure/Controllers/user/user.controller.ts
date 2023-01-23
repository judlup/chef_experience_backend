import DeleteUserUseCase from "@/Application/usecases/user/deleteuser.usecase"
import GetUserUseCase from "@/Application/usecases/user/getuser.usecase"
import GetUsersUseCase from "@/Application/usecases/user/getusers.usecase"
import LoginUserUseCase from "@/Application/usecases/user/loginuser.usecase"
import RegisterUserUseCase from "@/Application/usecases/user/registeruser.usecase"
import UpdateUserUseCase from "@/Application/usecases/user/updateuser.usecase"
import { UserControllerInterface } from "@/Domain/controllers/user/user.controller.interface"
import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import UserRepository from "@/Infrastructure/repositories/user/user.repository"
import { Request, Response } from "express"
import { StatusCode } from "status-code-enum"

const userRepository = new UserRepository()

export default class UserController implements UserControllerInterface {
  constructor() {}
  async getUsers(req: Request, res: Response): Promise<Response> {
    const getUsersUseCase = new GetUsersUseCase(userRepository)
    const users = await getUsersUseCase.execute()
    return res.status(StatusCode.SuccessOK).json({
      data: users,
    })
  }
  async getUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const getUserUseCase = new GetUserUseCase(userRepository)
    const user = await getUserUseCase.execute(userId)
    return res.status(StatusCode.SuccessOK).json({
      data: user,
    })
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    const user: UserInterface = req.body
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const newUser = await registerUserUseCase.execute(user)
    return res.status(StatusCode.SuccessCreated).json({
      data: newUser,
    })
  }
  async updateUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const user: UserInterface = req.body
    const updateUserUseCase = new UpdateUserUseCase(userRepository)
    const updatedUser = await updateUserUseCase.execute(userId, user)
    return res.status(StatusCode.SuccessOK).json({
      data: updatedUser,
    })
  }
  async deleteUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)
    const deletedUser = await deleteUserUseCase.execute(userId)
    return res.status(StatusCode.SuccessOK).json({
      data: deletedUser,
    })
  }
  async loginUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body
    const loginUserUseCase = new LoginUserUseCase(userRepository)
    const token = await loginUserUseCase.execute(username, password)
    return res.status(StatusCode.SuccessOK).json({
      data: token,
    })
  }
}
