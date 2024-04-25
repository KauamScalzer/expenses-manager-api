export interface IUpdateUserRepository {
  update: (id: string, data: IUpdateUserRepository.Params) => Promise<void>
}

export namespace IUpdateUserRepository {
  export type Params = {
    email?: string
    password?: string
    accessToken?: string
  }
}
