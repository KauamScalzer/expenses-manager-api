import { IGetAllExpensesByUser } from "../../domain/usecases"
import { IGetAllExpensesByUserRepository } from './../protocols/db'

export class GetAllExpensesByUser implements IGetAllExpensesByUser {
  constructor (
    private readonly getAllExpensesByUserRepository: IGetAllExpensesByUserRepository
  ){}

  async getAll (params: IGetAllExpensesByUser.Params): Promise<IGetAllExpensesByUser.Result> {
    return await this.getAllExpensesByUserRepository.getAllByUser(params)
  }
}
