import { SignUpController } from './../../../src/presentation/controllers'
import { serverError, unauthorized, ok, badRequest, forbidden } from './../../../src/presentation/helpers'
import { EmailInUseError, MissingParamError } from './../../../src/presentation/errors'
import { CreateUserSpy, AuthenticateUserSpy } from './../mocks'
import { throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): SignUpController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

type SutTypes = {
  sut: SignUpController
  createUserSpy: CreateUserSpy
  authenticateUserSpy: AuthenticateUserSpy
}

const makeSut = (): SutTypes => {
  const createUserSpy = new CreateUserSpy()
  const authenticateUserSpy = new AuthenticateUserSpy()
  const sut = new SignUpController(createUserSpy, authenticateUserSpy)
  return {
    sut,
    createUserSpy,
    authenticateUserSpy
  }
}

describe('SignUp Controller', () => {
  test('Should call ICreateUser with correct values', async () => {
    const { sut, createUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createUserSpy.user).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 403 if provided email is already in use', async () => {
    const { sut, createUserSpy } = makeSut()
    createUserSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
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

  test('Should return 500 if ICreateUser throws', async () => {
    const { sut, createUserSpy } = makeSut()
    jest.spyOn(createUserSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
