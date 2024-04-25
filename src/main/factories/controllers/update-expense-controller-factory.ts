import { Controller } from "./../../../presentation/protocols"
import { UpdateExpenseController } from "./../../../presentation/controllers"
import { makeUpdateExpense } from "../usecases"

export const makeUpdateExpenseController = (): Controller => {
  return new UpdateExpenseController(makeUpdateExpense())
}
