import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Meal } from "../meal/meal.entity"
import { User } from "../user/user.entity"

@Entity()
export class Rating {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number

  @Column({ type: "int" })
  rating!: number

  @PrimaryColumn("string")
  userId!: string

  @PrimaryColumn("string")
  mealId!: string

  @OneToOne(() => User)
  @JoinColumn()
  user!: User

  @ManyToOne(() => Meal, (meal) => meal.ratings)
  meal!: Meal

  toJSON() {
    return {
      ...this,
      userId: undefined,
      mealId: undefined,
    }
  }
}
