import { Controller } from "./../../../presentation/protocols"
import { SignUpController } from "./../../../presentation/controllers/signup-controller"
import { makeAddUser, makeAuthenticateUser } from "../usecases"

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeAddUser(), makeAuthenticateUser())
}
