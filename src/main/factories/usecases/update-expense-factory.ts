import { IUpdateExpense } from "./../../../domain/usecases"
import { UpdateExpense } from "./../../../data/usecases"
import { ExpenseRepository } from './../../../infra/db'

export const makeUpdateExpense = (): IUpdateExpense => {
  const expenseRepository = new ExpenseRepository()
  return new UpdateExpense(expenseRepository)
}
