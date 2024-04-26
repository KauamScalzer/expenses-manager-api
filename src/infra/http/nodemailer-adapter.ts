import { IHttpSendEmail } from './../../data/protocols'
import { nodemailerConfig } from './../../main/config/nodemailer'

export class NodemailerAdapter implements IHttpSendEmail {
  async send (data: IHttpSendEmail.Params): Promise<void> {
    await nodemailerConfig.sendMail({
      text: data.message,
      subject: data.title,
      to: [data.email]
    })
  }
}
