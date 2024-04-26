import { CreateExpenseController } from './../../../src/presentation/controllers'
import { serverError, ok, badRequest } from './../../../src/presentation/helpers'
import { MissingParamError } from './../../../src/presentation/errors'
import { CreateExpenseSpy, ValidateExpenseInputSpy, SendEmailSpy } from './../mocks'
import { throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): CreateExpenseController.Request => ({
  description: faker.lorem.text(),
  date: faker.date.anytime(),
  userId: faker.string.uuid(),
  value: faker.number.int()
})

type SutTypes = {
  sut: CreateExpenseController
  createExpenseSpy: CreateExpenseSpy
  validateExpenseInputSpy: ValidateExpenseInputSpy
  sendEmailSpy: SendEmailSpy
}

const makeSut = (): SutTypes => {
  const createExpenseSpy = new CreateExpenseSpy()
  const validateExpenseInputSpy = new ValidateExpenseInputSpy()
  const sendEmailSpy = new SendEmailSpy()
  const sut = new CreateExpenseController(createExpenseSpy, validateExpenseInputSpy, sendEmailSpy)
  return {
    sut,
    createExpenseSpy,
    validateExpenseInputSpy,
    sendEmailSpy
  }
}

describe('CreateExpense Controller', () => {
  test('Should call IValidateExpenseInput with correct values', async () => {
    const { sut, validateExpenseInputSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validateExpenseInputSpy.input).toEqual(request)
  })

  test('Should return 400 if IValidateExpenseInput returns an error', async () => {
    const { sut, validateExpenseInputSpy } = makeSut()
    validateExpenseInputSpy.result = new MissingParamError(faker.lorem.words())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validateExpenseInputSpy.result))
  })

  test('Should return 500 if IValidateExpenseInput throws', async () => {
    const { sut, validateExpenseInputSpy } = makeSut()
    jest.spyOn(validateExpenseInputSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call ICreateExpense with correct values', async () => {
    const { sut, createExpenseSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createExpenseSpy.params).toEqual(request)
  })

  test('Should call ISendEmail with correct values', async () => {
    const { sut, sendEmailSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(sendEmailSpy.data).toEqual({
      userId: request.userId,
      message: 'Despesa cadastrada',
      title: 'Despesa cadastrada'
    })
  })

  test('Should return 500 if ICreateExpense throws', async () => {
    const { sut, createExpenseSpy } = makeSut()
    jest.spyOn(createExpenseSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if ISendEmail throws', async () => {
    const { sut, sendEmailSpy } = makeSut()
    jest.spyOn(sendEmailSpy, 'send').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, createExpenseSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(createExpenseSpy.result))
  })
})
