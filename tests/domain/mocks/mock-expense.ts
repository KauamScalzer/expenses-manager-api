import { IAuthorizeUserExpense, ICreateExpense } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAuthorizeUserExpenseParams = (): IAuthorizeUserExpense.Params => ({
  authUserId: faker.string.uuid(),
  id: faker.string.uuid()
})

export const mockCreateExpenseParams = (): ICreateExpense.Params => ({
  description: faker.lorem.text(),
  date: faker.date.anytime(),
  userId: faker.string.uuid(),
  value: faker.number.int()
})
