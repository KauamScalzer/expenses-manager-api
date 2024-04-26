import { IDeleteExpense } from "../../domain/usecases"
import { IDeleteExpenseRepository } from './../protocols'

export class DeleteExpense implements IDeleteExpense {
  constructor (
    private readonly deleteExpenseRepository: IDeleteExpenseRepository
  ){}

  async delete (id: string): Promise<void> {
    await this.deleteExpenseRepository.delete(id)
  }
}
