import UserController from "@/Infrastructure/Controllers/user/user.controller"
import UserMiddleware from "@/Infrastructure/middlewares/user/user.middleware"
import express from "express"
const router = express.Router()
const userController = new UserController()
const userMiddleware = new UserMiddleware()

router.get("/", userMiddleware.use, userController.getUsers)
router.get("/chefs", userMiddleware.use, userController.getChefs)
router.get("/:id", userMiddleware.use, userController.getUser)
router.put("/:id", userMiddleware.use, userController.updateUser)
router.delete("/:id", userMiddleware.use, userController.deleteUser)
router.post("/", userController.registerUser)
router.post("/login", userController.loginUser)

export = router
