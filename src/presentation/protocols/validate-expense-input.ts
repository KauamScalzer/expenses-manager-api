export interface IValidateExpenseInput {
  validate: (input: IValidateExpenseInput.Params) => Promise<IValidateExpenseInput.Result>
}

export namespace IValidateExpenseInput {
  export type Params = {
    description: string
    value: number
    userId: string
    date: Date
  }
  export type Result = Error | null
}