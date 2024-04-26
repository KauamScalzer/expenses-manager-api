import { ICreateUserRepository, ICheckUserByEmailRepository, IGetOneUserByEmailRepository, IUpdateUserRepository, IGetOneUserByAccessTokenRepository, IGetOneUserRepository } from "./../../../data/protocols"
import { AppDataSource } from './../../../main/config/data-source'
import { User } from "../typeorm/models"

export class UserRepository implements ICreateUserRepository, ICheckUserByEmailRepository, IGetOneUserByEmailRepository, IUpdateUserRepository, IGetOneUserByAccessTokenRepository, IGetOneUserRepository {
  async create (user: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const userRepository = AppDataSource.getRepository(User)
    const createdUser = await userRepository.save(user)
    return {
      id: createdUser.id,
      email: createdUser.email
    }
  }

  async check (email: string): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { email }})
    return !!user
  }

  async getOneByEmail (email: string): Promise<IGetOneUserByEmailRepository.Result> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { email }})
    return user
  }

  async update (id: string, data: IUpdateUserRepository.Params): Promise<void> {
    const userRepository = AppDataSource.getRepository(User)
    await userRepository.update(id, data)
  }

  async getOneByAccessToken (accessToken: string): Promise<IGetOneUserByAccessTokenRepository.Result> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { accessToken }})
    return user
  }

  async getOne (id: string): Promise<IGetOneUserRepository.Result> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id }})
    return user
  }
}
