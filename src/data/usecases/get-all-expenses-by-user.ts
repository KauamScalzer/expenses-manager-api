import { IGetAllExpensesByUser } from "../../domain/usecases"
import { IGetAllExpensesByUserRepository } from './../protocols'

export class GetAllExpensesByUser implements IGetAllExpensesByUser {
  constructor (
    private readonly getAllExpensesByUserRepository: IGetAllExpensesByUserRepository
  ){}

  async getAll (userId: string): Promise<IGetAllExpensesByUser.Result> {
    return await this.getAllExpensesByUserRepository.getAllByUser(userId)
  }
}
