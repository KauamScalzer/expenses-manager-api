import { IUpdateExpense } from "../../domain/usecases"
import { IUpdateExpenseRepository } from './../protocols'

export class UpdateExpense implements IUpdateExpense {
  constructor (
    private readonly updateExpenseRepository: IUpdateExpenseRepository
  ){}

  async update (id: string, expense: IUpdateExpense.Params): Promise<void> {
    await this.updateExpenseRepository.update(id, expense)
  }
}
