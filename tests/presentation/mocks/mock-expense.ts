import { ICreateExpense, IGetAllExpensesByUser, IDeleteExpense, IUpdateExpense } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export class CreateExpenseSpy implements ICreateExpense {
  params: ICreateExpense.Params
  result: ICreateExpense.Result = {
    id: faker.string.uuid(),
    description: faker.lorem.text(),
    date: faker.date.anytime(),
    userId: faker.string.uuid(),
    value: faker.number.int()
  }

  async create (params: ICreateExpense.Params): Promise<ICreateExpense.Result> {
    this.params = params
    return this.result
  }
}

export class GetAllExpensesByUserSpy implements IGetAllExpensesByUser {
  userId: string
  result: IGetAllExpensesByUser.Result = [{
    id: faker.string.uuid(),
    description: faker.lorem.text(),
    date: faker.date.anytime(),
    userId: faker.string.uuid(),
    value: faker.number.int()
  },
  {
    id: faker.string.uuid(),
    description: faker.lorem.text(),
    date: faker.date.anytime(),
    userId: faker.string.uuid(),
    value: faker.number.int()
  }]

  async getAll (userId: string): Promise<IGetAllExpensesByUser.Result> {
    this.userId = userId
    return this.result
  }
}

export class DeleteExpenseSpy implements IDeleteExpense {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class UpdateExpenseSpy implements IUpdateExpense {
  id: string
  expense: IUpdateExpense.Params

  async update (id: string, expense: IUpdateExpense.Params): Promise<void> {
    this.id = id
    this.expense = expense
  }
}