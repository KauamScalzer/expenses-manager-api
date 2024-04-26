import { ICreateUser } from "./../../../domain/usecases"
import { CreateUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { BcryptAdapter } from './../../../infra/cryptography'

export const makeCreateUser = (): ICreateUser => {
  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(10)
  return new CreateUser(userRepository, bcryptAdapter, userRepository)
}
