export interface ICreateUser {
  create: (user: ICreateUser.Params) => Promise<boolean>
}

export namespace ICreateUser {
  export type Params = {
    email: string
    password: string
  }
}
