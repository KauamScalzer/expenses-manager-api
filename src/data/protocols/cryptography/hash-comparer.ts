export interface IHashComparer {
  compare: (string: string, stringToCompare: string) => Promise<boolean>
}
