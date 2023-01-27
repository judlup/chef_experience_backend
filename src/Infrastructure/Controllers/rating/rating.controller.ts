import RatingUseCase from "@/Application/usecases/rating/rating.usecase"
import { RatingControllerInterface } from "@/Domain/controllers/rating/rating.controller.interface"
import RatingRepository from "@/Infrastructure/repositories/rating/rating.repository"
import { Request, Response } from "express"
import StatusCode from "status-code-enum"

const ratingRepository = new RatingRepository()

export default class RatingController implements RatingControllerInterface {
  constructor() {}
  async rating(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId
    const mealId = req.body.mealId
    const ratingValue = req.body.rating
    const userAuth = req.body.userAuth
    if (!userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You are not logged in",
      })
    }
    if (!userId || !mealId || !ratingValue) {
      return res.status(StatusCode.ClientErrorBadRequest).json({
        message: "Bad Request",
      })
    }

    if (userId !== userAuth.id) {
      return res.status(StatusCode.ClientErrorForbidden).json({
        message: "You cannot rate for other users",
      })
    }
    const ratingUseCase = new RatingUseCase(ratingRepository)
    try {
      await ratingUseCase.execute(userId, mealId, ratingValue)
      return res.status(StatusCode.SuccessOK).json({
        message: "Rating added successfully",
        success: true,
      })
    } catch (err) {
      // WIP
      console.log(err)
      return res.status(StatusCode.ServerErrorInternal).json({
        message: "Internal Server Error",
      })
    }
  }
}
