export interface IGetOneUserByEmailRepository {
  getOneByEmail: (email: string) => Promise<IGetOneUserByEmailRepository.Result>
}

export namespace IGetOneUserByEmailRepository {
  export type Result = {
    id: string
    email: string
    password: string
    accessToken?: string
  } | null
}