import dataSource from "@/Infrastructure/database/mysql/mysql.config"
import app from "@/app"
const PORT = process.env.SERVER_PORT
dataSource
  .initialize()
  .then(() => {
    // console.log("Database connected")
  })
  .catch((error) => {
    console.log("Database connection error: ", error)
  })
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
