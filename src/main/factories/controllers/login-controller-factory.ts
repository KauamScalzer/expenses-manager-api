import { Controller } from "./../../../presentation/protocols"
import { LoginController } from "./../../../presentation/controllers"
import { makeAuthenticateUser } from "../usecases"

export const makeLoginController = (): Controller => {
  return new LoginController(makeAuthenticateUser())
}
