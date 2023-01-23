import * as dotenv from "dotenv"
import { DataSource } from "typeorm"

dotenv.config()

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/Domain/entities/**/*.ts"],
  logging: false,
  synchronize: true,
})

dataSource
  .initialize()
  .then(() => {
    console.log("Database connected")
  })
  .catch((error) => {
    console.log("Database connection error: ", error)
  })

export default dataSource
