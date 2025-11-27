import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { SignupResponse } from './SignupResponse';
import { CreateUserDto } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async create(payload: CreateUserDto): Promise<SignupResponse> {
        //save the user password in encrypted format 
        //save the user 
        //return the id and email
        const hash = await this.encryptPassword(payload.password,10);
        payload.password = hash;

       return await this.prisma.user.create(
            {
                data : payload,
                select: {
                    email: true,
                    id: true
                }
            
            });
    
    }
async encryptPassword(plaintext, saltround){

return await bcrypt.hashSync(plaintext,saltround);
}
}
