import { ICreateExpense, ISendEmail } from "../../domain/usecases"
import { ICreateExpenseRepository } from './../protocols'

export class CreateExpense implements ICreateExpense {
  constructor (
    private readonly createExpenseRepository: ICreateExpenseRepository,
    private readonly sendEmail: ISendEmail
  ){}

  async create (expense: ICreateExpense.Params): Promise<ICreateExpense.Result> {
    const createdExpense = await this.createExpenseRepository.create(expense)
    await this.sendEmail.send({ userId: expense.userId, message: 'teste', title: 'Despesa cadastrada' })
    return createdExpense
  }
}
