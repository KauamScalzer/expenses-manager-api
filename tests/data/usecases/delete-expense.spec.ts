import { DeleteExpense } from './../../../src/data/usecases'
import { DeleteExpenseRepositorySpy } from './../mocks'
import { throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DeleteExpense
  deleteExpenseRepositorySpy: DeleteExpenseRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteExpenseRepositorySpy = new DeleteExpenseRepositorySpy()
  const sut = new DeleteExpense(deleteExpenseRepositorySpy)
  return {
    sut,
    deleteExpenseRepositorySpy
  }
}

let id: string

describe('DeleteExpense Usecase', () => {
  beforeEach(() => {
    id = faker.string.uuid()
  })

  test('Should call IDeleteExpenseRepository with correct id', async () => {
    const { sut, deleteExpenseRepositorySpy } = makeSut()
    await sut.delete(id)
    expect(deleteExpenseRepositorySpy.id).toBe(id)
  })

  test('Should throw if IDeleteExpenseRepository throws', async () => {
    const { sut, deleteExpenseRepositorySpy } = makeSut()
    jest.spyOn(deleteExpenseRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(id)
    await expect(promise).rejects.toThrow()
  })
})
