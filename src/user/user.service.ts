import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  // Simulation of database table
  users = [
    new User({
      id: '1a2s3d4f',
      email: 'email@test.com',
      age: 18,
      admin: false,
      createdAt: new Date(),
    }),
  ]

  create(createUserDto: CreateUserDto) {
    this.users.push(new User(createUserDto))
  }

  findAll(limit?: number) {
    return structuredClone(this.users.slice(0, limit))
  }

  findOne(id: string) {
    const user = this.users.find(u => u.id === id)

    if (user === undefined) {
      throw new NotFoundException()
    }

    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id)

    Object.assign(user, updateUserDto)
  }

  remove(id: string) {
    const index = this.users.findIndex(u => u.id === id)

    if (index === -1) {
      throw new NotFoundException()
    }

    this.users.splice(index, 1)
  }
}
