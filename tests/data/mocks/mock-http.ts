import { IHttpSendEmail } from './../../../src/data/protocols'

export class HttpSendEmailSpy implements IHttpSendEmail {
  data: IHttpSendEmail.Params

  async send (data: IHttpSendEmail.Params): Promise<void> {
    this.data = data
  }
}
