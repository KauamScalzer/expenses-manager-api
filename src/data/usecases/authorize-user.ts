import { IAuthorizeUser } from '../../domain/usecases'
import { IGetOneUserByAccessTokenRepository, IDecrypter } from './../protocols'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly getOneUserByAccessTokenRepository: IGetOneUserByAccessTokenRepository
  ){}

  async authorize (accessToken: string): Promise<IAuthorizeUser.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const user = await this.getOneUserByAccessTokenRepository.getOneByAccessToken(accessToken)
      if (user) {
        return { authUserId: user.id }
      }
    }
    return null
  }
}
