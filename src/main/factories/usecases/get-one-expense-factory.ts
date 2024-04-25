import { IAuthorizeUserExpense } from "./../../../domain/usecases"
import { AuthorizeUserExpense } from "./../../../data/usecases"
import { ExpenseRepository } from './../../../infra/db/repositories'

export const makeAuthorizeUserExpense = (): IAuthorizeUserExpense => {
  const expenseRepository = new ExpenseRepository()
  return new AuthorizeUserExpense(expenseRepository)
}
