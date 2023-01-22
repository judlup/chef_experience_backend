import { Request, Response } from "express"

export interface MealControllerInterface {
  getMeals(req: Request, res: Response): Promise<Response>
  getMeal(req: Request, res: Response): Promise<Response>
  updateMeal(req: Request, res: Response): Promise<Response>
  deleteMeal(req: Request, res: Response): Promise<Response>
  addMeal(req: Request, res: Response): Promise<Response>
}
