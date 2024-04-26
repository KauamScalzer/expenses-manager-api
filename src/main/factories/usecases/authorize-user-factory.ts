import { IAuthorizeUser } from "./../../../domain/usecases"
import { AuthorizeUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { JwtAdapter } from './../../../infra/cryptography'

export const makeAuthorizeUser = (): IAuthorizeUser => {
  const bcryptAdapter = new JwtAdapter('string')
  const userRepository = new UserRepository()
  return new AuthorizeUser(bcryptAdapter, userRepository)
}
