export interface IAddUser {
  add: (user: IAddUser.Params) => Promise<boolean>
}

export namespace IAddUser {
  export type Params = {
    email: string
    password: string
  }
}
