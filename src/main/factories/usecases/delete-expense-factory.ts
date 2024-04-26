import { IDeleteExpense } from "./../../../domain/usecases"
import { DeleteExpense } from "./../../../data/usecases"
import { ExpenseRepository } from './../../../infra/db'

export const makeDeleteExpense = (): IDeleteExpense => {
  const expenseRepository = new ExpenseRepository()
  return new DeleteExpense(expenseRepository)
}
