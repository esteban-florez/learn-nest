export class User {
  id: string
  email: string
  age: number
  admin: boolean
  createdAt: Date

  constructor(params: User) {
    Object.assign(this, params)
  }
}
