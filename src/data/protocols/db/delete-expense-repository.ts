export interface IDeleteExpenseRepository {
  delete: (id: string) => Promise<void>
}
