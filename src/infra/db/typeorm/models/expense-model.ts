import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user-model"

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @Column()
  date: Date

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User, user => user.expenses)
  @JoinColumn({ name: 'user_id'})
  user: User
}