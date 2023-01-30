import { Request, Response } from "express"

export interface UserControllerInterface {
  getUsers(req: Request, res: Response): Promise<Response>
  getUser(req: Request, res: Response): Promise<Response>
  updateUser(req: Request, res: Response): Promise<Response>
  deleteUser(req: Request, res: Response): Promise<Response>
  registerUser(req: Request, res: Response): Promise<Response>
  loginUser(req: Request, res: Response): Promise<Response>
  getChefs(req: Request, res: Response): Promise<Response>
}
