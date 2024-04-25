import { IValidateExpenseInput } from './../presentation/protocols'
import { InvalidParamError } from './../presentation/errors'
import { IGetOneUserRepository } from '../data/protocols/db'

export class ValidateExpenseInput implements IValidateExpenseInput {
  constructor(
    private readonly getOneUserRepository: IGetOneUserRepository
  ){}

  async validate (input: IValidateExpenseInput.Params): Promise<IValidateExpenseInput.Result> {
    if (typeof input.description !== 'string') {
      return new InvalidParamError('description must be a string')
    }
    if (typeof input.value !== 'number') {
      return new InvalidParamError('value must be a number')
    }
    if (typeof input.userId !== 'string') {
      return new InvalidParamError('userId must be a string')
    }
    if (isNaN((new Date(input.date)).getTime())) {
      return new InvalidParamError('date must be a valid date')
    }
    if (input.description.length > 191) {
      return new InvalidParamError('description must be a string with a maximum length of 191 characters')
    }
    const receivedDate: Date = new Date(input.date)
    const currentDate: Date = new Date()
    if (receivedDate.getTime() > currentDate.getTime()) {
      return new InvalidParamError('date must be in the past')
    }
    if (input.value < 0) {
      return new InvalidParamError('value must be greater than zero')
    }
    const user = await this.getOneUserRepository.getOne(input.userId)
    if (!user) {
      return new InvalidParamError("The received userId doesn't exists")
    }
    return null
  }
}
