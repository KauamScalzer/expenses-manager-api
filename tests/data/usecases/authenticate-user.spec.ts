import { AuthenticateUser } from './../../../src/data/usecases'
import { GetOneUserByEmailRepositorySpy, HashComparerSpy, EncrypterSpy, UpdateUserRepositorySpy } from './../mocks'
import { mockCreateUserParams, throwError } from './../../domain/mocks'

type SutTypes = {
  sut: AuthenticateUser
  getOneUserByEmailRepositorySpy: GetOneUserByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateUserRepositorySpy: UpdateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const getOneUserByEmailRepositorySpy = new GetOneUserByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateUserRepositorySpy = new UpdateUserRepositorySpy()
  const sut = new AuthenticateUser(getOneUserByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateUserRepositorySpy)
  return {
    sut,
    getOneUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateUserRepositorySpy
  }
}

describe('AuthenticateUser Usecase', () => {
  test('Should call IGetOneUserByEmailRepository with correct email', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.auth(createUserParams)
    expect(getOneUserByEmailRepositorySpy.email).toBe(createUserParams.email)
  })

  test('Should call IHashComparer with correct passwords', async () => {
    const { sut, hashComparerSpy, getOneUserByEmailRepositorySpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.auth(createUserParams)
    expect(hashComparerSpy.string).toBe(createUserParams.password)
    expect(hashComparerSpy.stringToCompare).toBe(getOneUserByEmailRepositorySpy.result?.password)
  })

  test('Should call IEncrypter with correct id', async () => {
    const { sut, encrypterSpy, getOneUserByEmailRepositorySpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.auth(createUserParams)
    expect(encrypterSpy.stringToEncrypt).toBe(getOneUserByEmailRepositorySpy.result?.id)
  })

  test('Should call IUpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositorySpy, getOneUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.auth(createUserParams)
    expect(updateUserRepositorySpy.id).toBe(getOneUserByEmailRepositorySpy.result?.id)
    expect(updateUserRepositorySpy.params.accessToken).toBe(encrypterSpy.encryptedString)
  })

  test('Should throw if IGetOneUserByEmailRepository throws', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(getOneUserByEmailRepositorySpy, 'getOneByEmail').mockImplementationOnce(throwError)
    const createUserParams = mockCreateUserParams()
    const promise = sut.auth(createUserParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IHashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const createUserParams = mockCreateUserParams()
    const promise = sut.auth(createUserParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IEncrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const createUserParams = mockCreateUserParams()
    const promise = sut.auth(createUserParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IUpdateUserRepository throws', async () => {
    const { sut, updateUserRepositorySpy } = makeSut()
    jest.spyOn(updateUserRepositorySpy, 'update').mockImplementationOnce(throwError)
    const createUserParams = mockCreateUserParams()
    const promise = sut.auth(createUserParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if IGetOneUserByEmailRepository returns null', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    getOneUserByEmailRepositorySpy.result = null
    const createUserParams = mockCreateUserParams()
    const result = await sut.auth(createUserParams)
    expect(result).toBe(null)
  })

  test('Should return null if IHashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.valid = false
    const createUserParams = mockCreateUserParams()
    const result = await sut.auth(createUserParams)
    expect(result).toBe(null)
  })

  test('Should return an acessToken and id on success', async () => {
    const { sut, encrypterSpy, getOneUserByEmailRepositorySpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    const result = await sut.auth(createUserParams)
    expect(result).toEqual({
      accessToken: encrypterSpy.encryptedString,
      id: getOneUserByEmailRepositorySpy.result?.id
    })
  })
})
