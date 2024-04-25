export interface IDecrypter {
  decrypt: (stringToDecript: string) => Promise<string>
}
