import { ICreateExpense } from "../../../domain/usecases"

export interface IGetOneExpenseRepository {
  getOne: (id: string) => Promise<IGetOneExpenseRepository.Result>
}

export namespace IGetOneExpenseRepository {
  export type Result = ICreateExpense.Result | null
}
