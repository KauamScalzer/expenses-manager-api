import * as nodemailer from 'nodemailer'

export const nodemailerConfig = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'scalzerkauam10@gmail.com',
    pass: 'axbu kudx vskg lxim'
  },
  tls: {
    rejectUnauthorized: false
  }
})