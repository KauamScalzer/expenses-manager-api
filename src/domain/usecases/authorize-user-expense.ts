export interface IAuthorizeUserExpense {
  authorize: (data: IAuthorizeUserExpense.Params) => Promise<boolean>
}

export namespace IAuthorizeUserExpense {
  export type Params = {
    authUserId: string
    id: string
  }
}