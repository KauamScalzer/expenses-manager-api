import { ICreateExpense } from "../../../domain/usecases"

export interface ICreateExpenseRepository {
  create: (expense: ICreateExpenseRepository.Params) => Promise<ICreateExpenseRepository.Result>
}

export namespace ICreateExpenseRepository {
  export type Params = ICreateExpense.Params
  export type Result = ICreateExpense.Result
}
