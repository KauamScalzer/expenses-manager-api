import { IAddUser } from "./../../../domain/usecases"
import { AddUser } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { BcryptAdapter } from './../../../infra/cryptography'

export const makeAddUser = (): IAddUser => {
  const userRepository = new UserRepository()
  const bcryptAdapter = new BcryptAdapter(10)
  return new AddUser(userRepository, bcryptAdapter, userRepository)
}
