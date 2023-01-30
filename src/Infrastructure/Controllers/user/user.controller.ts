import DeleteUserUseCase from "@/Application/usecases/user/deleteuser.usecase"
import GetChefsUseCase from "@/Application/usecases/user/getchefs.usecase"
import GetUserUseCase from "@/Application/usecases/user/getuser.usecase"
import GetUsersUseCase from "@/Application/usecases/user/getusers.usecase"
import LoginUserUseCase from "@/Application/usecases/user/loginuser.usecase"
import RegisterUserUseCase from "@/Application/usecases/user/registeruser.usecase"
import UpdateUserUseCase from "@/Application/usecases/user/updateuser.usecase"
import { UserControllerInterface } from "@/Domain/controllers/user/user.controller.interface"
import { UserRole } from "@/Domain/enums/user/user.enum"
import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import UserRepository from "@/Infrastructure/repositories/user/user.repository"
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { StatusCode } from "status-code-enum"

const userRepository = new UserRepository()

export default class UserController implements UserControllerInterface {
  constructor() {}
  async getUsers(req: Request, res: Response): Promise<Response> {
    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not authorized to get users",
      })
    }
    const getUsersUseCase = new GetUsersUseCase(userRepository)
    try {
      const users = await getUsersUseCase.execute()
      return res.status(StatusCode.SuccessOK).json({
        data: users,
      })
    } catch (err) {
      return res.status(StatusCode.ServerErrorInternal).json({
        message: "Internal Server Error",
      })
    }
  }
  async getUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      if (userAuth.id !== userId) {
        return res.status(StatusCode.ClientErrorForbidden).json({
          message: "You are not authorized to get this user",
        })
      }
    }
    const getUserUseCase = new GetUserUseCase(userRepository)
    try {
      const user = await getUserUseCase.execute(userId)
      return res.status(StatusCode.SuccessOK).json({
        data: user,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).json({
        message: "User not found",
      })
    }
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    const user: UserInterface = req.body
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    try {
      const newUser = await registerUserUseCase.execute(user)
      return res.status(StatusCode.SuccessCreated).json({
        data: newUser,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "User already exists",
      })
    }
  }
  async updateUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      if (userAuth.id !== userId) {
        return res.status(StatusCode.ClientErrorForbidden).json({
          message: "You are not authorized to update this user",
        })
      }
    }
    const user: UserInterface = req.body
    const updateUserUseCase = new UpdateUserUseCase(userRepository)
    try {
      const updatedUser = await updateUserUseCase.execute(userId, user)
      return res.status(StatusCode.SuccessOK).json({
        data: updatedUser,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "User cannot be updated",
      })
    }
  }
  async deleteUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const userAuth = req.body.userAuth
    if (userAuth.role !== UserRole.ADMIN) {
      if (userAuth.id !== userId) {
        return res.status(StatusCode.ClientErrorForbidden).json({
          message: "You are not authorized to delete this user",
        })
      }
    }
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)
    try {
      const deletedUser = await deleteUserUseCase.execute(userId)
      return res.status(StatusCode.SuccessOK).json({
        data: deletedUser,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "User cannot be deleted",
      })
    }
  }
  async loginUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body
    const loginUserUseCase = new LoginUserUseCase(userRepository)
    try {
      const token = await loginUserUseCase.execute(username, password)
      return res.status(StatusCode.SuccessOK).json({
        data: token,
      })
    } catch (err) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "User or password incorrect",
      })
    }
  }
  async getChefs(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    const userAuth = req.body.userAuth
    if (!userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not authorized to get chefs",
      })
    }
    const getCheefsUseCase = new GetChefsUseCase(userRepository)
    try {
      const chefs = await getCheefsUseCase.execute()
      return res.status(StatusCode.SuccessOK).json({
        data: chefs,
      })
    } catch (err) {
      return res.status(StatusCode.ServerErrorInternal).json({
        message: "Internal Server Error",
      })
    }
  }
}
