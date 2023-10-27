import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

const userPayload = {
  email: 'test@test.com',
  name: 'name',
  password: 'password',
};

const mockPrismaService = {
  user: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({
      id: 'someid',
      ...userPayload,
    }),
    delete: jest.fn().mockResolvedValue({}),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const userPayload = {
      email: 'test@test.com',
      name: 'name',
      password: 'password',
    };

    const result = await service.create(userPayload);
    expect(result.id).toEqual('someid');
    expect(mockPrismaService.user.create).toHaveBeenCalled();
  });
});
