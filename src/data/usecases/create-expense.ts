import { ICreateExpense } from "../../domain/usecases"
import { ICreateExpenseRepository } from './../protocols'

export class CreateExpense implements ICreateExpense {
  constructor (
    private readonly createExpenseRepository: ICreateExpenseRepository
  ){}

  async create (expense: ICreateExpense.Params): Promise<ICreateExpense.Result> {
    return await this.createExpenseRepository.create(expense)
  }
}
