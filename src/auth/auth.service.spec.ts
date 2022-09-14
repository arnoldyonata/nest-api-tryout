import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwt: JwtService;

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
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwt = module.get<JwtService>(JwtService);
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
      new Promise((resolve) => {
        process.nextTick(() => {
          resolve(user);
        });
      }),
    );
    const result = await service.validateUser('john doe', 'change me');
    expect(result.id).toEqual(user.id);
    expect(result.username).toEqual(user.username);
    expect(result.password).toBeUndefined();
  });
});
