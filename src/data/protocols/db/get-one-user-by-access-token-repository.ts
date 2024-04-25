export interface IGetOneUserByAccessTokenRepository {
  getOneByAccessToken: (accessToken: string) => Promise<IGetOneUserByAccessTokenRepository.Result>
}

export namespace IGetOneUserByAccessTokenRepository {
  export type Result = {
    id: string
    email: string
    password: string
    accessToken?: string
  } | null
}