import mealRoutes from "@/Infrastructure/Routes/meal/meal.routes"
import userRoutes from "@/Infrastructure/Routes/user/user.routes"
import * as dotenv from "dotenv"
import express, { Express } from "express"
import http from "http"
import morgan from "morgan"
import { StatusCode } from "status-code-enum"

dotenv.config()

const app: Express = express()

/* Logging */
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
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
app.use("/meals", mealRoutes)
app.use("/users", userRoutes)

/* Error handling */
app.use((req, res, next) => {
  const error = new Error("not found")
  return res.status(StatusCode.ClientErrorNotFound).json({
    message: error.message,
  })
})

/* Server */
const httpServer = http.createServer(app)
const PORT: any = process.env.SERVER_PORT ?? 5000
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
)
