export interface ICreateUserRepository {
  create: (user: ICreateUserRepository.Params) => Promise<ICreateUserRepository.Result>
}

export namespace ICreateUserRepository {
  export type Params = {
    email: string
    password: string
  }
  export type Result = {
    id: string
    email: string
  }
}
