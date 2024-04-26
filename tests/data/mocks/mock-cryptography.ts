import { IDecrypter, IEncrypter, IHashComparer, IHasher } from './../../../src/data/protocols'
import { faker } from '@faker-js/faker'

export class DecrypterSpy implements IDecrypter {
  decryptedString = faker.string.uuid()
  stringToDecript: string

  async decrypt (stringToDecript: string): Promise<string> {
    this.stringToDecript = stringToDecript
    return this.decryptedString
  }
}

export class EncrypterSpy implements IEncrypter {
  encryptedString = faker.string.uuid()
  stringToEncrypt: string

  async encrypt (stringToEncrypt: string): Promise<string> {
    this.stringToEncrypt = stringToEncrypt
    return this.encryptedString
  }
}

export class HashComparerSpy implements IHashComparer {
  valid = true
  string: string
  stringToCompare: string

  async compare (string: string, stringToCompare: string): Promise<boolean> {
    this.string = string
    this.stringToCompare = stringToCompare
    return this.valid
  }
}

export class HasherSpy implements IHasher {
  hashedString = faker.string.uuid()
  stringToHash: string

  async hash (stringToHash: string): Promise<string> {
    this.stringToHash = stringToHash
    return this.hashedString
  }
}