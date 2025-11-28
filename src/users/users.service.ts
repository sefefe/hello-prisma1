import { UpdateUserDto } from './../dto/update-user-dto';
import { PrismaService } from '../../src/prisma.service';
import { Injectable } from '@nestjs/common';
import { SignupResponse } from './SignupResponse';
import { CreateUserDto } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  async update(updateUserDto: UpdateUserDto) {
    updateUserDto.email = updateUserDto.email ?? 'email';
    const update = await this.prisma.user.update({
      where: { email: updateUserDto.email },
      data: {
        firstName: 'hello',
      },
    });
  }
  async findByIde(id: number) {
    const user = await this.prisma.user.findFirst({
      //where: { id: id },
      where: {
        // AND: [{firstName: 'sefefe'},{lastName: 'secondName'}, {id:{gte: 3}}]
        // OR: [{firstName: 'sefefe'},{firstName: 'sefefe1'}]
        // the above is the same as below
        //fistName: {in: ['sefefe,sefefe1]}
      },
    });
    console.log(user);
    return user;
  }
  async findByName(name: string) {
    const users = await this.prisma.user.findMany({
      where: { firstName: name },
    });
    console.log(users);
    return users;
  }

  async createMany(manyusers: CreateUserDto[]) {
    console.log(manyusers);
    await this.prisma.user.createMany({
      data: manyusers,
    });
  }
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<SignupResponse | null> {
    //save the user password in encrypted format
    //save the user
    //return the id and email
    const hash = await this.encryptPassword(payload.password, 10);
    payload.password = hash;
    // const { firstName, lastName, email } = payload;
    try {
    } catch (err) {
      console.log('connection' + err);
    }

    try {
      const res = await this.prisma.user.create({
        data: payload,
        select: {
          email: true,
          id: true,
        },
      });
      return res;
    } catch (err) {
      console.log(' this is an error' + err);
      return null;
    }
  }

  async encryptPassword(plaintext: string, saltround: string | number) {
    return await bcrypt.hash(plaintext, saltround);
  }
}
