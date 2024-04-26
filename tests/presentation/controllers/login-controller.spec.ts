import { LoginController } from './../../../src/presentation/controllers'
import { serverError, unauthorized, ok, badRequest } from './../../../src/presentation/helpers'
import { MissingParamError } from './../../../src/presentation/errors'
import { AuthenticateUserSpy } from './../mocks'
import { throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

type SutTypes = {
  sut: LoginController
  authenticateUserSpy: AuthenticateUserSpy
}

const makeSut = (): SutTypes => {
  const authenticateUserSpy = new AuthenticateUserSpy()
  const sut = new LoginController(authenticateUserSpy)
  return {
    sut,
    authenticateUserSpy
  }
}

describe('Login Controller', () => {
  test('Should call IAuthenticateUser with correct values', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticateUserSpy.data).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    authenticateUserSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticateUserSpy.result))
  })

  test('Should return 400 if required params are not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      email: '',
      password: faker.internet.password()
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 500 if IAuthenticateUser throws', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    jest.spyOn(authenticateUserSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
