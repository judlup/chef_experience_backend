import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import { JwtUtilInterface } from "@/Domain/utils/jwt/jwt.util.interface"
import dotenv from "dotenv"
const jwt = require("jsonwebtoken")
dotenv.config()

export default class JwtUtil implements JwtUtilInterface {
  async sign(user: Partial<UserInterface>): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    })
    return token
  }

  async verify(token: string): Promise<Partial<UserInterface>> {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}
