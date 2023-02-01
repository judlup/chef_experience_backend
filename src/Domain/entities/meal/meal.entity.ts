import { MealInterface } from "@/Domain/interfaces/meal/meal.interface"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Rating } from "../rating/rating.entity"
import { User } from "../user/user.entity"

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

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User

  @OneToMany(() => Rating, (rating) => rating.meal, { cascade: true })
  ratings!: Rating[]

  async addRating(rating: Rating) {
    if (this.ratings == null) {
      this.ratings = new Array<Rating>()
    }
    this.ratings.push(rating)
  }

  // generate a function to calculate the average rating of the meal
  getAverageRating() {
    if (this.ratings == null) return 0
    if (this.ratings.length == 0) {
      return 0
    }
    let sum = 0
    this.ratings.forEach((rating) => {
      sum += rating.rating
    })
    return sum / this.ratings.length
  }

  toJSON() {
    return {
      ...this,
      average: this.getAverageRating(),
    }
  }
}
