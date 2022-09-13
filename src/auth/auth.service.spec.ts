import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be undefined', async () => {
    const x = await service.validateUser('username', 'password');
    expect(x).toBeUndefined();
  });

  it('check authenticate', async () => {
    const user = {
      id: 1,
      username: 'john doe',
      password: 'change me',
    };
    jest.spyOn(usersService, 'findOne').mockReturnValue(
      new Promise((resolve, reject) => {
        process.nextTick(() => {
          resolve(user);
        });
      }),
    );
    const x = await service.validateUser('john doe', 'change me');
    expect(x).toBeDefined();
  });
});
