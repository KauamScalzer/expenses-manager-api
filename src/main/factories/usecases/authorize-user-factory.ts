import { IAuthorizeUser } from "./../../../domain/usecases"
import { AuthorizeUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { JwtAdapter } from './../../../infra/cryptography'
import env from './../../config/env'

export const makeAuthorizeUser = (): IAuthorizeUser => {
  const bcryptAdapter = new JwtAdapter(env.jwtSecret)
  const userRepository = new UserRepository()
  return new AuthorizeUser(bcryptAdapter, userRepository)
}
