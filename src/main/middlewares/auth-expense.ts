import { adaptMiddleware } from './../adapters'
import { makeAuthExpenseMiddleware } from './../factories/middlewares'

export const authExpense = adaptMiddleware(makeAuthExpenseMiddleware())
