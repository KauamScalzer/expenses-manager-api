import { DeleteExpenseController } from './../../../src/presentation/controllers'
import { noContent, ok, serverError } from './../../../src/presentation/helpers'
import { throwError } from './../../domain/mocks'
import { DeleteExpenseSpy } from '../mocks'

type SutTypes = {
  sut: DeleteExpenseController
  deleteExpenseSpy: DeleteExpenseSpy
}

const makeSut = (): SutTypes => {
  const deleteExpenseSpy = new DeleteExpenseSpy()
  const sut = new DeleteExpenseController(deleteExpenseSpy)
  return {
    sut,
    deleteExpenseSpy
  }
}

describe('DeleteExpense Controller', () => {
  test('Should call IDeleteExpense with correct id', async () => {
    const { sut, deleteExpenseSpy } = makeSut()
    const deleteSpy = jest.spyOn(deleteExpenseSpy, 'delete')
    await sut.handle({ id: 'any_id' })
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ id: 'any_id' })
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if IDeleteExpense throws', async () => {
    const { sut, deleteExpenseSpy } = makeSut()
    jest.spyOn(deleteExpenseSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({ id: 'any_id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
