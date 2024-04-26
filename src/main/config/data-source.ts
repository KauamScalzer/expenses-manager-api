import { DataSource } from "typeorm"
import { User, Expense } from './../../infra/db/typeorm/models'

export const AppDataSource = new DataSource({
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
