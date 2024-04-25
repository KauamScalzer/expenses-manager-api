import { IAuthenticateUser } from "./../../../domain/usecases"
import { AuthenticateUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db/repositories'
import { BcryptAdapter, JwtAdapter } from './../../../infra/cryptography'

export const makeAuthenticateUser = (): IAuthenticateUser => {
  const salt = 10
  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter('string')
  return new AuthenticateUser(userRepository, bcryptAdapter, jwtAdapter, userRepository)
}
