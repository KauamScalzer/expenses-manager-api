import { GetAllExpensesByUserController } from './../../../src/presentation/controllers'
import { ok, serverError } from './../../../src/presentation/helpers'
import { throwError } from './../../domain/mocks'
import { GetAllExpensesByUserSpy } from './../mocks'

type SutTypes = {
  sut: GetAllExpensesByUserController
  getAllExpensesByUserSpy: GetAllExpensesByUserSpy
}

const makeSut = (): SutTypes => {
  const getAllExpensesByUserSpy = new GetAllExpensesByUserSpy()
  const sut = new GetAllExpensesByUserController(getAllExpensesByUserSpy)
  return {
    sut,
    getAllExpensesByUserSpy
  }
}

describe('GetAllExpensesByUser Controller', () => {
  test('Should call IGetAllExpensesByUser with correct userId', async () => {
    const { sut, getAllExpensesByUserSpy } = makeSut()
    const getAllSpy = jest.spyOn(getAllExpensesByUserSpy, 'getAll')
    await sut.handle({ userId: 'any_id' })
    expect(getAllSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 200 with expenses on success', async () => {
    const { sut, getAllExpensesByUserSpy } = makeSut()
    const httpResponse = await sut.handle({ userId: 'any_id' })
    expect(httpResponse).toEqual(ok(getAllExpensesByUserSpy.result))
  })

  test('Should return 500 if IGetAllExpensesByUser throws', async () => {
    const { sut, getAllExpensesByUserSpy } = makeSut()
    jest.spyOn(getAllExpensesByUserSpy, 'getAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({ userId: 'any_id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
