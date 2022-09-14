import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('Local', () => {
  let service: LocalStrategy;
  let auth: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
    auth = module.get<AuthService>(AuthService);
  });

  it('should be undefined', async () => {
    expect(service).toBeDefined();
  });

  it('should return user', async () => {
    const user = {
      id: 1,
      username: 'john doe',
    };
    jest.spyOn(auth, 'validateUser').mockReturnValue(
      new Promise((resolve) => {
        process.nextTick(() => {
          resolve(user);
        });
      }),
    );
    const result = await service.validate('john doe', 'change me');
    expect(result.id).toEqual(user.id);
    expect(result.username).toEqual(user.username);
  });

  it('should throw error', async () => {
    try {
      await service.validate('john doe', 'x me');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
