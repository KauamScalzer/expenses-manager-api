import { Controller, HttpResponse } from './../protocols'
import { serverError, noContent } from './../helpers'
import { IDeleteExpense } from './../../domain/usecases'

export class DeleteExpenseController implements Controller {
  constructor(
    private readonly deleteExpense: IDeleteExpense
  ){}

  async handle (request: DeleteExpenseController.Request): Promise<HttpResponse> {
    try {
      await this.deleteExpense.delete(request.id)
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace DeleteExpenseController {
  export type Request = {
    id: string
  }
}
