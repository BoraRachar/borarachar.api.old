import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/domain/services/auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from '../../src/domain/services/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';
import { HashPassword } from "../../src/domain/core/hashPassword";

describe("AuthController", () => {
  let service: AuthService;
  let jwtService: JwtService;
  let prisma: PrismaService;
  let hashPassword: HashPassword

  const email = 'any-email';
  const password = 'any-password'
  const user = {
    id: 'any-id',
    email: 'any-email',
    password: 'any-password',
    createdAt: 'any-date'
  }

  interface IPayload {
    email: string,
    subject: string
  }

  beforeEach(async () => {

    const mockPrisma = {
      user: {
        findUnique: jest.fn(),
      }
    }

    class MockHashPassword {
      comparePass = jest.fn((pass: string, hash: string) => {
        return true;
      });
    }

    const mockJwtService = {
      sign: jest.fn((payload: IPayload) => 'any-token')
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {provide: JwtService, useValue: mockJwtService}, {provide: PrismaService, useValue: mockPrisma}, {provide: HashPassword, useClass: MockHashPassword}],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    hashPassword = module.get<HashPassword>(HashPassword)
    jwtService = module.get<JwtService>(JwtService)
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("validateUser()", () => {

    it('should throw if prisma throws', async () => {

      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      )

      expect(service.validateUser(email, password)).rejects.toThrow()
    });

    it('should call prisma', async () => {

      await service.validateUser(email, password)

      expect(prisma.user.findUnique).toBeCalledTimes(1)
    });

    it('should pass the correct param to prisma', async () => {

      await service.validateUser(email, password)

      expect(prisma.user.findUnique).toBeCalledWith({
        where: { email }
      })
    });

    it('should call comparePass if prisma returns a user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)
      await service.validateUser(email, password)

      expect(hashPassword.comparePass).toBeCalledTimes(1)
    });

    it('should call comparePass with the correct params', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)
      await service.validateUser(email, password)

      expect(hashPassword.comparePass).toBeCalledWith(password, user.password)
    });

    it('should return user email if passwords match', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)

      expect(await service.validateUser(email, password)).toEqual({
        email: user.email
      })
    });
  });

  describe('login()', () => {

    it('should throw if prisma throws', async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      )

      expect(service.login(email)).rejects.toThrow()
    });

    it('should call prisma', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)
      await service.login(email)

      expect(prisma.user.findUnique).toBeCalledTimes(1)
    });

    it('should call JwtService sign method with correct params', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)
      await service.login(email)

      expect(jwtService.sign).toBeCalledWith({
        email: email,
        subject: user.id
      })
      expect(jwtService.sign({
        email: email,
        subject: user.id
      })).toEqual('any-token')
    });

    it('should return a token if a user is found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      await service.login(email)

      expect(await service.login(email)).toEqual({
        user: {email: user.email},
        accessToken: 'any-token'
      })
    })
  })
});
