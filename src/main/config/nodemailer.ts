import * as nodemailer from 'nodemailer'
import env from './env'

export const nodemailerConfig = nodemailer.createTransport({
  host: env.nodemailerHost,
  port: env.nodemailerPort ? parseInt(env.nodemailerPort) : 0,
  secure: false,
  auth: {
    user: env.nodemailerUser,
    pass: env.nodemailerPass
  },
  tls: {
    rejectUnauthorized: false
  }
})
