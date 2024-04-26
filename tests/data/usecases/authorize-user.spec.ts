import { AuthorizeUser } from './../../../src/data/usecases'
import { DecrypterSpy, GetOneUserByAccessTokenRepositorySpy } from './../mocks'
import { throwError } from './../../domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: AuthorizeUser
  decrypterSpy: DecrypterSpy
  getOneUserByAccessTokenRepositorySpy: GetOneUserByAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const getOneUserByAccessTokenRepositorySpy = new GetOneUserByAccessTokenRepositorySpy()
  const sut = new AuthorizeUser(decrypterSpy, getOneUserByAccessTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    getOneUserByAccessTokenRepositorySpy
  }
}

let accessToken: string

describe('AuthorizeUser Usecase', () => {
  beforeEach(() => {
    accessToken = faker.string.uuid()
  })

  test('Should call IDecrypter with correct accessToken', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.authorize(accessToken)
    expect(decrypterSpy.stringToDecript).toBe(accessToken)
  })

  test('Should call IGetOneUserByAccessTokenRepository with correct accessToken', async () => {
    const { sut, getOneUserByAccessTokenRepositorySpy } = makeSut()
    await sut.authorize(accessToken)
    expect(getOneUserByAccessTokenRepositorySpy.accessToken).toBe(accessToken)
  })

  test('Should return null if IDecrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const result = await sut.authorize(accessToken)
    expect(result).toBe(null)
  })

  test('Should throw if IGetOneUserByAccessTokenRepository throws', async () => {
    const { sut, getOneUserByAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(getOneUserByAccessTokenRepositorySpy, 'getOneByAccessToken').mockImplementationOnce(throwError)
    const promise = sut.authorize(accessToken)
    await expect(promise).rejects.toThrow()
  })


  test('Should return null if IGetOneUserByAccessTokenRepository return false', async () => {
    const { sut, getOneUserByAccessTokenRepositorySpy } = makeSut()
    getOneUserByAccessTokenRepositorySpy.result = null
    const result = await sut.authorize(accessToken)
    expect(result).toBe(null)
  })

  test('Should return authUserId on success', async () => {
    const { sut, getOneUserByAccessTokenRepositorySpy } = makeSut()
    const result = await sut.authorize(accessToken)
    expect(result).toEqual({ authUserId: getOneUserByAccessTokenRepositorySpy.result?.id })
  })
})
