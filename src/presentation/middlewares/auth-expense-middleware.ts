import { Middleware, HttpResponse } from './../protocols'
import { forbidden, ok, serverError } from './../helpers'
import { AccessDeniedError } from './../errors'
import { IAuthorizeUserExpense } from './../../domain/usecases'

export class AuthExpenseMiddleware implements Middleware {
  constructor (
    private readonly authorizeUserExpense: IAuthorizeUserExpense
  ) {}

  async handle (request: AuthExpenseMiddleware.Request): Promise<HttpResponse> {
    try {
      const { authUserId, id } = request
      const authorizedUser = await this.authorizeUserExpense.authorize({ authUserId, id })
      if (authorizedUser) {
        return ok(authorizedUser)
      }
      return forbidden(new AccessDeniedError())
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AuthExpenseMiddleware {
  export type Request = {
    authUserId: string
    id: string
  }
}
