import { ICreateExpense } from "./../../../domain/usecases"
import { CreateExpense } from "./../../../data/usecases"
import { ExpenseRepository } from './../../../infra/db'

export const makeCreateExpense = (): ICreateExpense => {
  const expenseRepository = new ExpenseRepository()
  return new CreateExpense(expenseRepository)
}
