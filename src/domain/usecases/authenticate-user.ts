export interface IAuthenticateUser {
  auth: (data: IAuthenticateUser.Params) => Promise<IAuthenticateUser.Result>
}

export namespace IAuthenticateUser {
  export type Params = {
    email: string
    password: string
  }
  export type Result = {
    id: string
    accessToken: string
  } | null
}
