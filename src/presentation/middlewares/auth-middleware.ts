import { Middleware, HttpResponse } from './../protocols'
import { forbidden, ok, serverError } from './../helpers'
import { AccessDeniedError } from './../errors'
import { IAuthorizeUser } from './../../domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly authorizeUser: IAuthorizeUser
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const authorizedUser = await this.authorizeUser.authorize(accessToken)
        if (authorizedUser) {
          return ok(authorizedUser)
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
