export interface IDeleteExpense {
  delete: (id: string) => Promise<void>
}
