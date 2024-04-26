import { IValidateExpenseInput } from './../../../src/presentation/protocols'

export class ValidateExpenseInputSpy implements IValidateExpenseInput {
  input: IValidateExpenseInput.Params
  result: IValidateExpenseInput.Result = null

  async validate (input: IValidateExpenseInput.Params): Promise<IValidateExpenseInput.Result> {
    this.input = input
    return this.result
  }
}