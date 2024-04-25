import { IGetAllExpensesByUser } from "./../../../domain/usecases"
import { GetAllExpensesByUser } from "./../../../data/usecases"
import { ExpenseRepository } from './../../../infra/db/repositories'

export const makeGetAllExpensesByUser = (): IGetAllExpensesByUser => {
  const expenseRepository = new ExpenseRepository()
  return new GetAllExpensesByUser(expenseRepository)
}
