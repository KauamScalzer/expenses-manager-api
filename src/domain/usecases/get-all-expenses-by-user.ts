import { ICreateExpense } from "./create-expense"

export interface IGetAllExpensesByUser {
  getAll: (params: IGetAllExpensesByUser.Params) => Promise<IGetAllExpensesByUser.Result>
}

export namespace IGetAllExpensesByUser {
  export type Params = {
    userId: string
  }
  export type Result = ICreateExpense.Result[]
}
