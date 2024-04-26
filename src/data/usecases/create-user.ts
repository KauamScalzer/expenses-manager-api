import { ICreateUser } from "../../domain/usecases"
import { ICheckUserByEmailRepository, ICreateUserRepository, IHasher } from './../protocols'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
    private readonly hasher: IHasher,
    private readonly createUserRepository: ICreateUserRepository
  ){}

  async create (user: ICreateUser.Params): Promise<boolean> {
    const userExists = await this.checkUserByEmailRepository.check(user.email)
    if (!userExists) {
      const hashPassword = await this.hasher.hash(user.password)
      await this.createUserRepository.create({ ...user, password: hashPassword })
      return true
    }
    return false
  }
}
