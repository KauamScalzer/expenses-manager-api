import { CreateUser } from './../../../src/data/usecases'
import { CheckUserByEmailRepositorySpy, HasherSpy, CreateUserRepositorySpy } from './../mocks'
import { mockCreateUserParams, throwError } from './../../domain/mocks'

type SutTypes = {
  sut: CreateUser
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
  hasherSpy: HasherSpy
  createUserRepositorySpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateUser(checkUserByEmailRepositorySpy, hasherSpy, createUserRepositorySpy)
  return {
    sut,
    checkUserByEmailRepositorySpy,
    hasherSpy,
    createUserRepositorySpy
  }
}

describe('CreateUser Usecase', () => {
  test('Should call ICheckUserByEmailRepository with correct email', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(checkUserByEmailRepositorySpy.email).toBe(createUserParams.email)
  })

  test('Should call IHasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(hasherSpy.stringToHash).toBe(createUserParams.password)
  })

  test('Should call ICreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy, hasherSpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(createUserRepositorySpy.user).toEqual({
      email: createUserParams.email,
      password: hasherSpy.hashedString
    })
  })

  test('Should throw if ICheckUserByEmailRepository throws', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkUserByEmailRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IHasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if ICreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const valid = await sut.create(mockCreateUserParams())
    expect(valid).toBe(true)
  })

  test('Should return false if ICheckUserByEmailRepository returns false', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    checkUserByEmailRepositorySpy.valid = true
    const valid = await sut.create(mockCreateUserParams())
    expect(valid).toBe(false)
  })
})
