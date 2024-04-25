import { Controller, HttpResponse } from './../protocols'
import { badRequest, serverError, ok, unauthorized } from './../helpers'
import { MissingParamError } from './../errors'
import { IAuthenticateUser } from './../../domain/usecases'

export class LoginController implements Controller {
  constructor(
    private readonly authenticateUser: IAuthenticateUser
  ){}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['email', 'password']
      for (const field of requiredFields) {
        if (!request[field as keyof LoginController.Request]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const token = await this.authenticateUser.auth(request)
      if (!token) {
        return unauthorized()
      }
      return ok(token)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
