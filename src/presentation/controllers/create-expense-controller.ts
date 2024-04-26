import { Controller, HttpResponse, IValidateExpenseInput } from './../protocols'
import { badRequest, serverError, ok } from './../helpers'
import { MissingParamError } from './../errors'
import { ICreateExpense, ISendEmail } from './../../domain/usecases'

export class CreateExpenseController implements Controller {
  constructor(
    private readonly createExpense: ICreateExpense,
    private readonly validateExpenseInput: IValidateExpenseInput,
    private readonly sendEmail: ISendEmail
  ){}

  async handle (request: CreateExpenseController.Request): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['description', 'date', 'userId', 'value']
      for (const field of requiredFields) {
        if (!request[field as keyof CreateExpenseController.Request]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const invalidParams = await this.validateExpenseInput.validate(request)
      if (invalidParams) {
        return badRequest(invalidParams)
      }
      const expense = await this.createExpense.create(request)
      await this.sendEmail.send({ userId: request.userId, message: 'Despesa cadastrada', title: 'Despesa cadastrada' })
      return ok(expense)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace CreateExpenseController {
  export type Request = {
    description: string
    date: Date
    userId: string
    value: number
  }
}
