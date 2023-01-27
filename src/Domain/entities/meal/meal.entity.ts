import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Rating } from "../rating/rating.entity"

@Entity()
export class Meal implements MealInterface {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar", length: 100 })
  name!: string

  @Column({ type: "varchar", length: 255 })
  description!: string

  @Column({ type: "int" })
  price!: number

  @Column({ type: "varchar", length: 255 })
  image!: string

  @Column({ type: "varchar", length: 255 })
  chef_id!: string

  @Column({ type: "boolean", default: true })
  status!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToMany(() => Rating, (rating) => rating.mealId, { cascade: true })
  @JoinTable({ name: "ratings" })
  ratings!: Rating[]

  async addRating(rating: Rating) {
    if (this.ratings == null) {
      this.ratings = new Array<Rating>()
    }
    this.ratings.push(rating)
  }
}
