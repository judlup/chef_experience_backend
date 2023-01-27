import { UserRole } from "@/Domain/enums/user/user.enum"
import { UserInterface } from "@/Domain/interfaces/user/user.interface"
import bcrypt from "bcryptjs"
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Index("email_index")
  @Column({ type: "varchar", length: 100, unique: true })
  username!: string

  @Column({ type: "varchar", length: 255 })
  password!: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole

  @Column({ type: "boolean", default: true })
  status!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    }
  }
}
