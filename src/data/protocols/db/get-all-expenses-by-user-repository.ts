import { IGetAllExpensesByUser } from "../../../domain/usecases"

export interface IGetAllExpensesByUserRepository {
  getAllByUser: (userId: string) => Promise<IGetAllExpensesByUserRepository.Result>
}

export namespace IGetAllExpensesByUserRepository {
  export type Result = IGetAllExpensesByUser.Result
}
