import { auth, authExpense } from '../middlewares'
import { adaptRoute } from './../adapters'
import { makeCreateExpenseController, makeGetAllExpensesByUserController, makeDeleteExpenseController, makeUpdateExpenseController } from './../factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/expense', auth, adaptRoute(makeCreateExpenseController()))
  router.get('/expense/by-user/:userId', auth, authExpense, adaptRoute(makeGetAllExpensesByUserController()))
  router.delete('/expense/:id', auth, authExpense, adaptRoute(makeDeleteExpenseController()))
  router.put('/expense/:id', auth, authExpense, adaptRoute(makeUpdateExpenseController()))
}
