import { Controller, HttpResponse } from './../protocols'
import { serverError, ok } from './../helpers'
import { IDeleteExpense } from './../../domain/usecases'

export class DeleteExpenseController implements Controller {
  constructor(
    private readonly deleteExpense: IDeleteExpense
  ){}

  async handle (request: DeleteExpenseController.Request): Promise<HttpResponse> {
    try {
      const expenses = await this.deleteExpense.delete(request.id)
      return ok(expenses)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteExpenseController {
  export type Request = {
    id: string
  }
}
