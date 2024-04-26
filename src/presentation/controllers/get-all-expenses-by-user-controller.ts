import { Controller, HttpResponse } from './../protocols'
import { serverError, ok } from './../helpers'
import { IGetAllExpensesByUser } from './../../domain/usecases'

export class GetAllExpensesByUserController implements Controller {
  constructor(
    private readonly getAllExpensesByUser: IGetAllExpensesByUser
  ){}

  async handle (request: GetAllExpensesByUserController.Request): Promise<HttpResponse> {
    try {
      const expenses = await this.getAllExpensesByUser.getAll(request.userId)
      return ok(expenses)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace GetAllExpensesByUserController {
  export type Request = {
    userId: string
  }
}
