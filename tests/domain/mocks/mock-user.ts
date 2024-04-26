import { ICreateUser } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockCreateUserParams = (): ICreateUser.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
