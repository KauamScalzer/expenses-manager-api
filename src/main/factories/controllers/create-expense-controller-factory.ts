import { Controller } from "./../../../presentation/protocols"
import { CreateExpenseController } from "./../../../presentation/controllers"
import { makeCreateExpense } from "../usecases"
import { makeValidateExpenseInput } from "../validators"

export const makeCreateExpenseController = (): Controller => {
  return new CreateExpenseController(makeCreateExpense(), makeValidateExpenseInput())
}
