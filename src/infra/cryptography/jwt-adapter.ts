import { IEncrypter, IDecrypter } from './../../data/protocols'
import * as jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  async encrypt (stringToEncrypt: string): Promise<string> {
    return jwt.sign({ id: stringToEncrypt }, this.secret)
  }

  async decrypt (stringToDecrypt: string): Promise<string> {
    return jwt.verify(stringToDecrypt, this.secret) as any
  }
}
