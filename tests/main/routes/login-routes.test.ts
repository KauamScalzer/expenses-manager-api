import { setupApp } from './../../../src/main/config/app'
import { Express } from 'express'
import * as request from 'supertest'
import { TypeormHelper } from './../../../src/infra/db/typeorm/helpers/typeorm-helper'

let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await TypeormHelper.connect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'rodrigo.manguinho@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
