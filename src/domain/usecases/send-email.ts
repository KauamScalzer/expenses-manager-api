export interface ISendEmail {
  send: (data: ISendEmail.Params) => Promise<void>
}

export namespace ISendEmail {
  export type Params = {
    userId: string
    message: string
    title: string
  }
}
