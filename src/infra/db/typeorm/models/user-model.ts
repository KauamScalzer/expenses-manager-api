import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Expense } from "./expense-model"

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'access_token', nullable: true })
  accessToken?: string

  @OneToMany(() => Expense, expense => expense.user)
  expenses: Expense[]
}