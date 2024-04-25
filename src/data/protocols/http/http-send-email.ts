export interface IHttpSendEmail {
  send: (data: IHttpSendEmail.Params) => Promise<void>
}

export namespace IHttpSendEmail {
  export type Params = {
    email: string
    message: string
    title: string
  }
}