export interface ICreateExpense {
  create: (expense: ICreateExpense.Params) => Promise<ICreateExpense.Result>
}

export namespace ICreateExpense {
  export type Params = {
    description: string
    date: Date
    userId: string
    value: number
  }
  export type Result = {
    id: string
  } & Params
}
