import { adaptRoute } from './../adapters'
import { makeSignUpController, makeLoginController } from './../factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/signup', adaptRoute(makeSignUpController()))
}
