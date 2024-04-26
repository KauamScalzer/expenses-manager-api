import { CreateExpense } from './../../../src/data/usecases'
import { CreateExpenseRepositorySpy } from './../mocks'
import { mockCreateExpenseParams, throwError } from './../../domain/mocks'

type SutTypes = {
  sut: CreateExpense
  createExpenseRepositorySpy: CreateExpenseRepositorySpy
}

const makeSut = (): SutTypes => {
  const createExpenseRepositorySpy = new CreateExpenseRepositorySpy()
  const sut = new CreateExpense(createExpenseRepositorySpy)
  return {
    sut,
    createExpenseRepositorySpy
  }
}

describe('CreateExpense Usecase', () => {
  test('Should call ICreateExpenseRepository with correct values', async () => {
    const { sut, createExpenseRepositorySpy } = makeSut()
    const createExpenseParams = mockCreateExpenseParams()
    await sut.create(createExpenseParams)
    expect(createExpenseRepositorySpy.expense).toEqual(createExpenseParams)
  })

  test('Should throw if ICreateExpenseRepository throws', async () => {
    const { sut, createExpenseRepositorySpy } = makeSut()
    jest.spyOn(createExpenseRepositorySpy, 'create').mockImplementationOnce(throwError)
    const createExpenseParams = mockCreateExpenseParams()
    const promise = sut.create(createExpenseParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an expense on success', async () => {
    const { sut, createExpenseRepositorySpy } = makeSut()
    const createExpenseParams = mockCreateExpenseParams()
    const result = await sut.create(createExpenseParams)
    expect(result).toEqual(createExpenseRepositorySpy.result)
  })
})
