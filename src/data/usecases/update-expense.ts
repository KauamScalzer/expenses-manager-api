import { IUpdateExpense } from "../../domain/usecases"
import { IUpdateExpenseRepository } from './../protocols/db'

export class UpdateExpense implements IUpdateExpense {
  constructor (
    private readonly updateExpenseRepository: IUpdateExpenseRepository
  ){}

  async update (id: string, expense: IUpdateExpense.Params): Promise<void> {
    await this.updateExpenseRepository.update(id, expense)
  }
}
