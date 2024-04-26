import { ICreateExpenseRepository, IGetAllExpensesByUserRepository, IDeleteExpenseRepository, IUpdateExpenseRepository, IGetOneExpenseRepository } from "./../../../data/protocols"
import { AppDataSource } from './../../../main/config/data-source'
import { Expense } from "../typeorm/models"

export class ExpenseRepository implements ICreateExpenseRepository, IGetAllExpensesByUserRepository, IDeleteExpenseRepository, IUpdateExpenseRepository, IGetOneExpenseRepository {
  async create (expense: ICreateExpenseRepository.Params): Promise<ICreateExpenseRepository.Result> {
    const expenseRepository = AppDataSource.getRepository(Expense)
    return await expenseRepository.save(expense)
  }

  async getAllByUser (params: IGetAllExpensesByUserRepository.Params): Promise<IGetAllExpensesByUserRepository.Result> {
    const expenseRepository = AppDataSource.getRepository(Expense)
    return await expenseRepository.find({ where: { userId: params.userId } })
  }

  async delete (id: string): Promise<void> {
    const expenseRepository = AppDataSource.getRepository(Expense)
    await expenseRepository.delete(id)
  }

  async update (id: string, expense: Partial<IUpdateExpenseRepository.Params>): Promise<void> {
    const expenseRepository = AppDataSource.getRepository(Expense)
    await expenseRepository.update(id, expense)
  }

  async getOne (id: string): Promise<IGetOneExpenseRepository.Result> {
    const expenseRepository = AppDataSource.getRepository(Expense)
    return await expenseRepository.findOne({ where: { id }})
  }
}
