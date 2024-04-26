import { IAuthenticateUser } from "./../../../domain/usecases"
import { AuthenticateUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { BcryptAdapter, JwtAdapter } from './../../../infra/cryptography'
import env from './../../config/env'

export const makeAuthenticateUser = (): IAuthenticateUser => {
  const salt = 10
  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new AuthenticateUser(userRepository, bcryptAdapter, jwtAdapter, userRepository)
}
