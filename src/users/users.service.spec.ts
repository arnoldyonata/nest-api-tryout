import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return john doe', async () => {
    const user = await service.findOne('john doe');
    expect(user.username).toEqual('john doe');
  });

  it('should return undefined', async () => {
    const user = await service.findOne('xxxx');
    expect(user).toBeUndefined();
  });
});
