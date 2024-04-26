import { IAuthenticateUser } from '../../domain/usecases'
import { IGetOneUserByEmailRepository, IUpdateUserRepository, IHashComparer, IEncrypter } from './../protocols'

export class AuthenticateUser implements IAuthenticateUser {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateUserRepository: IUpdateUserRepository
  ){}

  async auth (data: IAuthenticateUser.Params): Promise<IAuthenticateUser.Result> {
    const user = await this.getOneUserByEmailRepository.getOneByEmail(data.email)
    if (user) {
      const validPassword = await this.hashComparer.compare(data.password, user.password)
      if (validPassword) {
        const token = await this.encrypter.encrypt(user.id)
        await this.updateUserRepository.update(user.id, { accessToken: token })
        return { accessToken: token, id: user.id }
      }
    }
    return null
  }
}
