import { UserMiddlewareInterface } from "@/Domain/middlewares/user/user.middleware.interface"
import JwtUtil from "@/Infrastructure/utils/jwt/jwt.util"
import { NextFunction, Request, Response } from "express"
import StatusCode from "status-code-enum"

export default class UserMiddleware implements UserMiddlewareInterface {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
      return res.status(StatusCode.ClientErrorUnauthorized).json({
        message: "Unauthorized",
      })
    }
    const jwtUtil = new JwtUtil()
    const decoded = await jwtUtil.verify(token)
    req.body.userAuth = decoded
    next()
  }
}
