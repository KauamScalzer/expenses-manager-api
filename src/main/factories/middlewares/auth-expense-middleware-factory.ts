import { makeAuthorizeUserExpense } from './../usecases'
import { Middleware } from './../../../presentation/protocols'
import { AuthExpenseMiddleware } from './../../../presentation/middlewares'

export const makeAuthExpenseMiddleware = (): Middleware => {
  return new AuthExpenseMiddleware(makeAuthorizeUserExpense())
}
