import { ISendEmail } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSendEmailParams = (): ISendEmail.Params => ({
  userId: faker.string.uuid(),
  message: faker.lorem.paragraphs(),
  title: faker.lorem.sentence()
})
