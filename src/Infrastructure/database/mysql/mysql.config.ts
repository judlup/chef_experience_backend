import { Meal } from "@/Domain/entities/meal/meal.entity"
import { Rating } from "@/Domain/entities/rating/rating.entity"
import { User } from "@/Domain/entities/user/user.entity"
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
  entities: [
    "src/modules/**/*.entity.{ts,js}",
    "dist/module/**/*.entity{.ts,.js}",
    Meal,
    User,
    Rating,
  ],
  logging: false,
  synchronize: true,
})

dataSource.initialize().catch((error) => {
  console.log("Database connection error: ", error)
})

export default dataSource
