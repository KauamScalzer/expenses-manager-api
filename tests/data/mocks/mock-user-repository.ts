import { ICreateUserRepository, ICheckUserByEmailRepository, IGetOneUserByEmailRepository, IUpdateUserRepository, IGetOneUserByAccessTokenRepository, IGetOneUserRepository } from './../../../src/data/protocols'
import { faker } from '@faker-js/faker'

export class CreateUserRepositorySpy implements ICreateUserRepository {
  result = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
  }
  user: ICreateUserRepository.Params

  async create (user: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    this.user = user
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy implements ICheckUserByEmailRepository {
  valid = false
  email: string

  async check (email: string): Promise<boolean> {
    this.email = email
    return this.valid
  }
}

export class GetOneUserByEmailRepositorySpy implements IGetOneUserByEmailRepository {
  result: IGetOneUserByEmailRepository.Result = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  email: string

  async getOneByEmail (email: string): Promise<IGetOneUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  id: string
  params: IUpdateUserRepository.Params

  async update (id: string, params: IUpdateUserRepository.Params): Promise<void> {
    this.id = id
    this.params = params
  }
}

export class GetOneUserByAccessTokenRepositorySpy implements IGetOneUserByAccessTokenRepository {
  result: IGetOneUserByAccessTokenRepository.Result = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: faker.string.uuid()
  }
  accessToken: string

  async getOneByAccessToken (accessToken: string): Promise<IGetOneUserByAccessTokenRepository.Result> {
    this.accessToken = accessToken
    return this.result
  }
}

export class GetOneUserRepositorySpy implements IGetOneUserRepository {
  result: IGetOneUserRepository.Result = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: faker.string.uuid()
  }
  id: string

  async getOne (id: string): Promise<IGetOneUserRepository.Result> {
    this.id = id
    return this.result
  }
}