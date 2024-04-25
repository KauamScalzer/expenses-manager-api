export interface IUpdateExpense {
  update: (id: string, expense: IUpdateExpense.Params) => Promise<void>
}

export namespace IUpdateExpense {
  export type Params = {
    description: string
    date: Date
    userId: string
    value: number
  }
}
