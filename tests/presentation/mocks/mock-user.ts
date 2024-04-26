import { ICreateUser, IAuthenticateUser, IAuthorizeUser, IAuthorizeUserExpense } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export class CreateUserSpy implements ICreateUser {
  user: ICreateUser.Params
  result = true

  async create (user: ICreateUser.Params): Promise<boolean> {
    this.user = user
    return this.result
  }
}

export class AuthenticateUserSpy implements IAuthenticateUser {
  data: IAuthenticateUser.Params
  result: IAuthenticateUser.Result = {
    id: faker.string.uuid(),
    accessToken: faker.string.uuid()
  }

  async auth (data: IAuthenticateUser.Params): Promise<IAuthenticateUser.Result> {
    this.data = data
    return this.result
  }
}

export class AuthorizeUserSpy implements IAuthorizeUser {
  token: string
  result: IAuthorizeUser.Result = {
    authUserId: faker.string.uuid(),
  }

  async authorize (token: string): Promise<IAuthorizeUser.Result> {
    this.token = token
    return this.result
  }
}

export class AuthorizeUserExpenseSpy implements IAuthorizeUserExpense {
  data: IAuthorizeUserExpense.Params
  result: boolean = true

  async authorize (data: IAuthorizeUserExpense.Params): Promise<boolean> {
    this.data = data
    return this.result
  }
}