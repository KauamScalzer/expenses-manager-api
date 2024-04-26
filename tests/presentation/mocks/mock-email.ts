import { ISendEmail } from './../../../src/domain/usecases'

export class SendEmailSpy implements ISendEmail {
  data: ISendEmail.Params

  async send (data: ISendEmail.Params): Promise<void> {
    this.data = data
  }
}