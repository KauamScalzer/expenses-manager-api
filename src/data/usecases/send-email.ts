import { ISendEmail } from "../../domain/usecases"
import { IGetOneUserRepository, IHttpSendEmail } from './../protocols'

export class SendEmail implements ISendEmail {
  constructor (
    private readonly getOneUserRepository: IGetOneUserRepository,
    private readonly httpSendEmail: IHttpSendEmail
  ){}

  async send (data: ISendEmail.Params): Promise<void> {
    const user = await this.getOneUserRepository.getOne(data.userId)
    if (user) {
      await this.httpSendEmail.send({ email: user.email, ...data })
    }
  }
}
