import { DataSource } from "typeorm"
import { User, Expense } from './../../infra/db/typeorm/models'
import env from './env'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.dbHost,
    port: parseInt(env.dbPort),
    username: env.dbUserName,
    password: env.dbPassword,
    database: env.dbName,
    entities: [User, Expense],
    synchronize: true,
    logging: false,
})
