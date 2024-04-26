import { Controller, HttpResponse } from './../protocols'
import { badRequest, serverError, ok, forbidden } from './../helpers'
import { EmailInUseError, MissingParamError } from './../errors'
import { ICreateUser, IAuthenticateUser } from './../../domain/usecases'

export class SignUpController implements Controller {
  constructor(
    private readonly createUser: ICreateUser,
    private readonly authenticateUser: IAuthenticateUser
  ){}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['email', 'password']
      for (const field of requiredFields) {
        if (!request[field as keyof SignUpController.Request]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const user = await this.createUser.create(request)
      if (!user) {
        return forbidden(new EmailInUseError())
      }
      const token = await this.authenticateUser.auth(request)
      return ok(token)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
  }
}
