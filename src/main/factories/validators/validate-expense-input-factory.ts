import { IValidateExpenseInput } from "./../../../presentation/protocols"
import { ValidateExpenseInput } from "../../../validators"
import { UserRepository } from './../../../infra/db'

export const makeValidateExpenseInput = (): IValidateExpenseInput => {
  const userRepository = new UserRepository()
  return new ValidateExpenseInput(userRepository)
}
