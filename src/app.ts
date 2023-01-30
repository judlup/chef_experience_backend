import mealRoutes from "@/Infrastructure/Routes/meal/meal.routes"
import ratingRoutes from "@/Infrastructure/Routes/rating/rating.routes"
import userRoutes from "@/Infrastructure/Routes/user/user.routes"
import cors from "cors"
import * as dotenv from "dotenv"
import express, { Express } from "express"
import morgan from "morgan"
import { StatusCode } from "status-code-enum"

dotenv.config()

const app: Express = express()

/* Logging */
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
/* enable cors */
app.use(cors())

/* Parse the request */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* Api rules */
app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*")
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  )
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST")
    return res.status(StatusCode.SuccessOK).json({})
  }
  next()
})

/* Routes */
app.get("/", async (req, res) => {
  return res.status(StatusCode.SuccessOK).json({
    message: "It's working!",
  })
})
app.use("/meals", mealRoutes)
app.use("/users", userRoutes)
app.use("/ratings", ratingRoutes)

/* Error handling */
app.use((req, res, next) => {
  const error = new Error("not found")
  return res.status(StatusCode.ClientErrorNotFound).json({
    message: error.message,
  })
})

export default app
