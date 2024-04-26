export interface IDecrypter {
  decrypt: (stringToDecrypt: string) => Promise<string>
}
