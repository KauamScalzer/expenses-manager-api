import { UpdateExpense } from './../../../src/data/usecases'
import { UpdateExpenseRepositorySpy } from './../mocks'
import { mockCreateExpenseParams, throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: UpdateExpense
  updateExpenseRepositorySpy: UpdateExpenseRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateExpenseRepositorySpy = new UpdateExpenseRepositorySpy()
  const sut = new UpdateExpense(updateExpenseRepositorySpy)
  return {
    sut,
    updateExpenseRepositorySpy
  }
}

let id: string

describe('UpdateExpense Usecase', () => {
  beforeEach(() => {
    id = faker.string.uuid()
  })

  test('Should call IUpdateExpenseRepository with correct values', async () => {
    const { sut, updateExpenseRepositorySpy } = makeSut()
    const updateExpenseParams = mockCreateExpenseParams()
    await sut.update(id, updateExpenseParams)
    expect(updateExpenseRepositorySpy.id).toEqual(id)
    expect(updateExpenseRepositorySpy.expense).toEqual(updateExpenseParams)
  })

  test('Should throw if IUpdateExpenseRepository throws', async () => {
    const { sut, updateExpenseRepositorySpy } = makeSut()
    jest.spyOn(updateExpenseRepositorySpy, 'update').mockImplementationOnce(throwError)
    const updateExpenseParams = mockCreateExpenseParams()
    const promise = sut.update(id, updateExpenseParams)
    await expect(promise).rejects.toThrow()
  })
})
