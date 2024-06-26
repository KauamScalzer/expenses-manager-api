import { makeAuthorizeUser } from './../usecases'
import { Middleware } from './../../../presentation/protocols'
import { AuthMiddleware } from './../../../presentation/middlewares'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeAuthorizeUser())
}
