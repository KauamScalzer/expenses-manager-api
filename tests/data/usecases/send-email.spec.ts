import { SendEmail } from './../../../src/data/usecases'
import { GetOneUserRepositorySpy, HttpSendEmailSpy } from './../mocks'
import { mockSendEmailParams, throwError } from './../../domain/mocks'

type SutTypes = {
  sut: SendEmail
  getOneUserRepositorySpy: GetOneUserRepositorySpy
  httpSendEmailSpy: HttpSendEmailSpy
}

const makeSut = (): SutTypes => {
  const getOneUserRepositorySpy = new GetOneUserRepositorySpy()
  const httpSendEmailSpy = new HttpSendEmailSpy()
  const sut = new SendEmail(getOneUserRepositorySpy, httpSendEmailSpy)
  return {
    sut,
    getOneUserRepositorySpy,
    httpSendEmailSpy
  }
}

describe('SendEmail Usecase', () => {
  test('Should call IGetOneUserRepository with correct userId', async () => {
    const { sut, getOneUserRepositorySpy } = makeSut()
    const sendEmailParams = mockSendEmailParams()
    await sut.send(sendEmailParams)
    expect(getOneUserRepositorySpy.id).toEqual(sendEmailParams.userId)
  })

  test('Should call IHttpSendEmail with correct values', async () => {
    const { sut, httpSendEmailSpy, getOneUserRepositorySpy } = makeSut()
    const sendEmailParams = mockSendEmailParams()
    await sut.send(sendEmailParams)
    expect(httpSendEmailSpy.data).toEqual({
      email: getOneUserRepositorySpy.result?.email,
      message: sendEmailParams.message,
      title: sendEmailParams.title
    })
  })

  test('Should throw if IGetOneUserRepository throws', async () => {
    const { sut, getOneUserRepositorySpy } = makeSut()
    jest.spyOn(getOneUserRepositorySpy, 'getOne').mockImplementationOnce(throwError)
    const sendEmailParams = mockSendEmailParams()
    const promise = sut.send(sendEmailParams)
    await expect(promise).rejects.toThrow()
  })
})
