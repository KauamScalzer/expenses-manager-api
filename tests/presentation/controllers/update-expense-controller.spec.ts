import { UpdateExpenseController } from './../../../src/presentation/controllers'
import { noContent, serverError } from './../../../src/presentation/helpers'
import { MissingParamError } from './../../../src/presentation/errors'
import { throwError } from './../../domain/mocks'
import { UpdateExpenseSpy } from './../mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: UpdateExpenseController
  updateExpenseSpy: UpdateExpenseSpy
}

const mockRequest = (): UpdateExpenseController.Request => ({
  id: faker.string.uuid(),
  description: faker.lorem.text(),
  date: faker.date.anytime(),
  userId: faker.string.uuid(),
  value: faker.number.int()
})

const makeSut = (): SutTypes => {
  const updateExpenseSpy = new UpdateExpenseSpy()
  const sut = new UpdateExpenseController(updateExpenseSpy)
  return {
    sut,
    updateExpenseSpy
  }
}

describe('UpdateExpense Controller', () => {
  test('Should return 400 if any required field is missing', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle({ ...request, userId: ''})
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('userId'))
  })

  test('Should call IUpdateExpense with correct values', async () => {
    const { sut, updateExpenseSpy } = makeSut()
    const updateSpy = jest.spyOn(updateExpenseSpy, 'update')
    const request = mockRequest()
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.id, request)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if IUpdateExpense throws', async () => {
    const { sut, updateExpenseSpy } = makeSut()
    jest.spyOn(updateExpenseSpy, 'update').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
