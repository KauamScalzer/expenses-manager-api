import { IHasher, IHashComparer } from './../../data/protocols/cryptography'
import * as bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (
    private readonly salt: number
  ) {}

  async hash (stringToHash: string): Promise<string> {
    return bcrypt.hash(stringToHash, this.salt)
  }

  async compare (string: string, stringToCompare: string): Promise<boolean> {
    return bcrypt.compare(string, stringToCompare)
  }
}
