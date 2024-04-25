import { Controller, HttpResponse } from './../protocols'
import { badRequest, serverError, ok } from './../helpers'
import { MissingParamError } from './../errors'
import { IUpdateExpense } from './../../domain/usecases'

export class UpdateExpenseController implements Controller {
  constructor(
    private readonly updateExpense: IUpdateExpense
  ){}

  async handle (request: UpdateExpenseController.Request): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['description', 'date', 'userId', 'value']
      for (const field of requiredFields) {
        if (!request[field as keyof UpdateExpenseController.Request]) {
          return badRequest(new MissingParamError(field))
        }
      }
      await this.updateExpense.update(request.id, request)
      return ok('')
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace UpdateExpenseController {
  export type Request = {
    id: string
    description: string
    date: Date
    userId: string
    value: number
  }
}
