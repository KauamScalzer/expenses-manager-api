import { Controller } from "./../../../presentation/protocols"
import { GetAllExpensesByUserController } from "./../../../presentation/controllers"
import { makeGetAllExpensesByUser } from "../usecases"

export const makeGetAllExpensesByUserController = (): Controller => {
  return new GetAllExpensesByUserController(makeGetAllExpensesByUser())
}
