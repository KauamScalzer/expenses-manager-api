import { ISendEmail } from "./../../../domain/usecases"
import { SendEmail } from "./../../../data/usecases"
import { UserRepository } from './../../../infra/db'
import { NodemailerAdapter } from './../../../infra/http'

export const makeSendEmail = (): ISendEmail => {
  const userRepository = new UserRepository()
  const nodemailerAdapter = new NodemailerAdapter()
  return new SendEmail(userRepository, nodemailerAdapter)
}
