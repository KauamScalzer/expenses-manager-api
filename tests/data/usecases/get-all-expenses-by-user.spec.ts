import { GetAllExpensesByUser } from './../../../src/data/usecases'
import { GetAllExpensesByUserRepositorySpy } from './../mocks'
import { mockCreateExpenseParams, throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: GetAllExpensesByUser
  getAllExpensesByUserRepositorySpy: GetAllExpensesByUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const getAllExpensesByUserRepositorySpy = new GetAllExpensesByUserRepositorySpy()
  const sut = new GetAllExpensesByUser(getAllExpensesByUserRepositorySpy)
  return {
    sut,
    getAllExpensesByUserRepositorySpy
  }
}

let userId: string

describe('GetAllExpensesByUser Usecase', () => {
  beforeEach(() => {
    userId = faker.string.uuid()
  })

  test('Should call IGetAllExpensesByUserRepository with correct userId', async () => {
    const { sut, getAllExpensesByUserRepositorySpy } = makeSut()
    await sut.getAll(userId)
    expect(getAllExpensesByUserRepositorySpy.userId).toEqual(userId)
  })

  test('Should throw if IGetAllExpensesByUserRepository throws', async () => {
    const { sut, getAllExpensesByUserRepositorySpy } = makeSut()
    jest.spyOn(getAllExpensesByUserRepositorySpy, 'getAllByUser').mockImplementationOnce(throwError)
    const promise = sut.getAll(userId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an array of expenses on success', async () => {
    const { sut, getAllExpensesByUserRepositorySpy } = makeSut()
    const result = await sut.getAll(userId)
    expect(result).toEqual(getAllExpensesByUserRepositorySpy.result)
  })
})
