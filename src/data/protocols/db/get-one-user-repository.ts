export interface IGetOneUserRepository {
  getOne: (id: string) => Promise<IGetOneUserRepository.Result>
}

export namespace IGetOneUserRepository {
  export type Result = {
    id: string
    email: string
    password: string
    accessToken?: string
  } | null
}