import { ICreateExpenseRepository, IGetAllExpensesByUserRepository, IDeleteExpenseRepository, IUpdateExpenseRepository, IGetOneExpenseRepository } from './../../../src/data/protocols'
import { faker } from '@faker-js/faker'

export class CreateExpenseRepositorySpy implements ICreateExpenseRepository {
  result = {
    id: faker.string.uuid(),
    description: faker.lorem.text(),
    date: faker.date.anytime(),
    userId: faker.string.uuid(),
    value: faker.number.int()
  }
  expense: ICreateExpenseRepository.Params

  async create (expense: ICreateExpenseRepository.Params): Promise<ICreateExpenseRepository.Result> {
    this.expense = expense
    return this.result
  }
}

export class GetAllExpensesByUserRepositorySpy implements IGetAllExpensesByUserRepository {
  result = [{
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
  userId: string

  async getAllByUser (userId: string): Promise<IGetAllExpensesByUserRepository.Result> {
    this.userId = userId
    return this.result
  }
}

export class DeleteExpenseRepositorySpy implements IDeleteExpenseRepository {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class UpdateExpenseRepositorySpy implements IUpdateExpenseRepository {
  id: string
  expense: IUpdateExpenseRepository.Params

  async update (id: string, expense: IUpdateExpenseRepository.Params): Promise<void> {
    this.id = id
    this.expense = expense
  }
}

export class GetOneExpenseRepositorySpy implements IGetOneExpenseRepository {
  result: IGetOneExpenseRepository.Result = {
    id: faker.string.uuid(),
    description: faker.lorem.text(),
    date: faker.date.anytime(),
    userId: faker.string.uuid(),
    value: faker.number.int()
  }
  id: string

  async getOne (id: string): Promise<IGetOneExpenseRepository.Result> {
    this.id = id
    return this.result
  }
}