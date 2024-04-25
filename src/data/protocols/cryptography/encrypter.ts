export interface IEncrypter {
  encrypt: (stringToEncrypt: string) => Promise<string>
}
