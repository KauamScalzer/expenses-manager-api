import { Controller } from "./../../../presentation/protocols"
import { DeleteExpenseController } from "./../../../presentation/controllers"
import { makeDeleteExpense } from "../usecases"

export const makeDeleteExpenseController = (): Controller => {
  return new DeleteExpenseController(makeDeleteExpense())
}
