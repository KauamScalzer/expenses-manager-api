import { IUpdateExpense } from "../../../domain/usecases"

export interface IUpdateExpenseRepository {
  update: (id: string, expense: IUpdateExpenseRepository.Params) => Promise<void>
}

export namespace IUpdateExpenseRepository {
  export type Params = Partial<IUpdateExpense.Params>
}
