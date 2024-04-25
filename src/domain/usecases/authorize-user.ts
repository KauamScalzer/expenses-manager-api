export interface IAuthorizeUser {
  authorize: (token: string) => Promise<IAuthorizeUser.Result>
}

export namespace IAuthorizeUser {
  export type Result = {
    authUserId: string
  } | null
}