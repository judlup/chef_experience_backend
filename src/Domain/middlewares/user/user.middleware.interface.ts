import { NextFunction, Request, Response } from "express"

export interface UserMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void
}
