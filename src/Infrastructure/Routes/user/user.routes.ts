import UserController from "@/Infrastructure/Controllers/user/user.controller"
import express from "express"
const router = express.Router()
const userController = new UserController()

router.get("/", userController.getUsers)
router.get("/:id", userController.getUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.post("/", userController.registerUser)
router.post("/login", userController.loginUser)

export = router
