import * as dotenv from 'dotenv'

dotenv.config({
  path: '.env'
})

export default {
  dbName: process.env.DB_NAME ?? '',
  dbUserName: process.env.DB_USERNAME ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbHost: process.env.DB_HOST ?? '',
  dbPort: process.env.DB_PORT ?? '',
  port: process.env.PORT ?? 5050,

  nodemailerPort: process.env.NODEMAILER_PORT,
  nodemailerHost: process.env.NODEMAILER_HOST ?? '',
  nodemailerUser: process.env.NODEMAILER_USER ?? '',
  nodemailerPass: process.env.NODEMAILER_PASS ?? '',

  jwtSecret: process.env.JWT_SECRET ?? ''
}
