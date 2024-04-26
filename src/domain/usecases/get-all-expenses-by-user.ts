import { ICreateExpense } from "./create-expense"

export interface IGetAllExpensesByUser {
  getAll: (userId: string) => Promise<IGetAllExpensesByUser.Result>
}

export namespace IGetAllExpensesByUser {
  export type Result = ICreateExpense.Result[]
}
