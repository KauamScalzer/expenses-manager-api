import { IAuthorizeUserExpense } from '../../domain/usecases'
import { IGetOneExpenseRepository } from './../protocols/db'

export class AuthorizeUserExpense implements IAuthorizeUserExpense {
  constructor (
    private readonly getOneExpenseRepository: IGetOneExpenseRepository
  ){}

  async authorize (data: IAuthorizeUserExpense.Params): Promise<boolean> {
    const expense = await this.getOneExpenseRepository.getOne(data.id)
    if (expense) {
      return expense.userId === data.authUserId
    }
    return false
  }
}
