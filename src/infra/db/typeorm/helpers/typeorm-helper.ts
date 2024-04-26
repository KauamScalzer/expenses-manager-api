import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Expense } from './../models'

export const TypeormHelper = {
  AppDataSource: null as unknown as DataSource,

  async connect () {
    const AppDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "expenses_manager_db",
      entities: [User, Expense],
      synchronize: true,
      logging: false,
  })
  console.log(AppDataSource)
  },

  async disconnect () {
    if (this.AppDataSource) {
      await this.AppDataSource.destroy()
    }
  }
}
