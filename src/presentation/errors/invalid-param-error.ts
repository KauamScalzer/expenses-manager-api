export class InvalidParamError extends Error {
  constructor (text: string) {
    super(`Invalid param: ${text}`)
    this.name = 'InvalidParamError'
  }
}
