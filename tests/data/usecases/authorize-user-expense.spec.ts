import { AuthorizeUserExpense } from './../../../src/data/usecases'
import { GetOneExpenseRepositorySpy } from './../mocks'
import { mockAuthorizeUserExpenseParams, throwError } from './../../domain/mocks'

type SutTypes = {
  sut: AuthorizeUserExpense
  getOneExpenseRepositorySpy: GetOneExpenseRepositorySpy
}

const makeSut = (): SutTypes => {
  const getOneExpenseRepositorySpy = new GetOneExpenseRepositorySpy()
  const sut = new AuthorizeUserExpense(getOneExpenseRepositorySpy)
  return {
    sut,
    getOneExpenseRepositorySpy
  }
}

describe('AuthorizeUserExpense Usecase', () => {
  test('Should call IGetOneExpenseRepository with correct id', async () => {
    const { sut, getOneExpenseRepositorySpy } = makeSut()
    const authorizeUserExpenseParams = mockAuthorizeUserExpenseParams()
    await sut.authorize(authorizeUserExpenseParams)
    expect(getOneExpenseRepositorySpy.id).toBe(authorizeUserExpenseParams.id)
  })

  test('Should throw if IGetOneUserByEmailRepository throws', async () => {
    const { sut, getOneExpenseRepositorySpy } = makeSut()
    jest.spyOn(getOneExpenseRepositorySpy, 'getOne').mockImplementationOnce(throwError)
    const authorizeUserExpenseParams = mockAuthorizeUserExpenseParams()
    const promise = sut.authorize(authorizeUserExpenseParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if IGetOneExpenseRepository returns null', async () => {
    const { sut, getOneExpenseRepositorySpy } = makeSut()
    getOneExpenseRepositorySpy.result = null
    const authorizeUserExpenseParams = mockAuthorizeUserExpenseParams()
    await sut.authorize(authorizeUserExpenseParams)
    expect(getOneExpenseRepositorySpy.id).toBe(authorizeUserExpenseParams.id)
  })

  test('Should return false if expense user id is different from provided userId', async () => {
    const { sut } = makeSut()
    const authorizeUserExpenseParams = mockAuthorizeUserExpenseParams()
    const result = await sut.authorize(authorizeUserExpenseParams)
    expect(result).toBe(false)
  })

  test('Should return true if expense user id is the same from provided userId', async () => {
    const { sut, getOneExpenseRepositorySpy } = makeSut()
    const authorizeUserExpenseParams = mockAuthorizeUserExpenseParams()
    if (getOneExpenseRepositorySpy.result) {
      getOneExpenseRepositorySpy.result.userId = authorizeUserExpenseParams.authUserId
    }
    const result = await sut.authorize(authorizeUserExpenseParams)
    expect(result).toBe(true)
  })
})
