import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

/*describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});*/

// Define the test suite for AuthController
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // Set up the testing environment
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        UsersModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: `${process.env.JWT_EXPIRES}` },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  // Test case for successful login
  it('should return access token on successful login', async () => {
    // Define the login credentials
    const loginDto: AuthDto = { username: 'john', password: 'changeme' };

    // Mock the AuthService's login method
    jest
      .spyOn(authService, 'signIn')
      .mockImplementation(() => Promise.resolve('ACCESS_TOKEN'));

    // Call the login method on the AuthController
    const result = await controller.signIn(loginDto);

    // Assert that the result is equal to the expected access token
    expect(result).toEqual('ACCESS_TOKEN');
  });

  // Test case for failed login
  it('should throw UnauthorizedException on failed login', async () => {
    // Define the login credentials
    const loginDto: AuthDto = {
      username: 'john',
      password: 'wrong-pass',
    };

    // Mock the AuthService's login method to throw an exception
    jest.spyOn(authService, 'signIn').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    // Call the login method on the AuthController and expect it to throw UnauthorizedException
    await expect(controller.signIn(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
