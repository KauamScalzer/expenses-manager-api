import "reflect-metadata"
import { setupApp } from './../../../src/main/config/app'
import { Express } from 'express'
import * as request from 'supertest'

let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'teste.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
