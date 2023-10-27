import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomException } from 'src/shared/exeptions';
import { CreateUser } from 'src/users/domain/classes';
import { CreateUserPayloadDto } from 'src/users/dto';
import { IUser, IUsersService } from 'src/users/typing';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private prismaService: PrismaService) {}

  public async create(payload: CreateUserPayloadDto): Promise<IUser> {
    await this.checkExistBeforeCreate(payload.email);
    const data = await CreateUser.createData(payload);
    const user = await this.prismaService.user.create({ data });
    return user;
  }

  private async checkExistBeforeCreate(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (user) throw new CustomException({ key: 'userExist' });
  }
}
