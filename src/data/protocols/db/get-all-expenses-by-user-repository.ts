import { IGetAllExpensesByUser } from "../../../domain/usecases"

export interface IGetAllExpensesByUserRepository {
  getAllByUser: (params: IGetAllExpensesByUserRepository.Params) => Promise<IGetAllExpensesByUserRepository.Result>
}

export namespace IGetAllExpensesByUserRepository {
  export type Params = IGetAllExpensesByUser.Params
  export type Result = IGetAllExpensesByUser.Result
}
