import { Request, Response } from "express"

export interface RatingControllerInterface {
  rating(req: Request, res: Response): Promise<Response | string>
}
