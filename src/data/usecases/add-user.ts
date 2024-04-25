import { IAddUser } from "../../domain/usecases"
import { ICheckUserByEmailRepository, ICreateUserRepository } from './../protocols/db'
import { IHasher } from './../protocols/cryptography'

export class AddUser implements IAddUser {
  constructor (
    private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
    private readonly hasher: IHasher,
    private readonly createUserRepository: ICreateUserRepository
  ){}

  async add (user: IAddUser.Params): Promise<boolean> {
    const userExists = await this.checkUserByEmailRepository.check(user.email)
    if (!userExists) {
      const hashPassword = await this.hasher.hash(user.password)
      await this.createUserRepository.create({ ...user, password: hashPassword })
      return true
    }
    return false
  }
}
