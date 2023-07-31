import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/domain/services/auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from '../../src/domain/services/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';
import { HashPassword } from "../../src/domain/core/hashPassword";
import { userMock } from "./mocks/users.mock";

describe("AuthController", () => {
  let service: AuthService;
  let jwtService: JwtService;
  let prisma: PrismaService;
  let hashPassword: HashPassword

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

      expect(service.validateUser(userMock.email, userMock.password)).rejects.toThrow()
    });

    it('should call prisma', async () => {

      await service.validateUser(userMock.email, userMock.password)

      expect(prisma.user.findUnique).toBeCalledTimes(1)
    });

    it('should pass the correct param to prisma', async () => {

      await service.validateUser(userMock.email, userMock.password)

      expect(prisma.user.findUnique).toBeCalledWith({
        where: { email: userMock.email }
      })
    });

    it('should call comparePass if prisma returns a user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser)
      await service.validateUser(userMock.email, userMock.password)

      expect(hashPassword.comparePass).toBeCalledTimes(1)
    });

    it('should call comparePass with the correct params', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser)
      await service.validateUser(userMock.email, userMock.password)

      expect(hashPassword.comparePass).toBeCalledWith(userMock.password, userMock.returnedUser.password)
    });

    it('should return user email if passwords match', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser)

      expect(await service.validateUser(userMock.email, userMock.password)).toEqual({
        email: userMock.returnedUser.email
      })
    });
  });

  describe('login()', () => {

    it('should throw if prisma throws', async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      )

      expect(service.login(userMock.email)).rejects.toThrow()
    });

    it('should call prisma', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser)
      await service.login(userMock.email)

      expect(prisma.user.findUnique).toBeCalledTimes(1)
    });

    it('should call JwtService sign method with correct params', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser)
      await service.login(userMock.email)

      expect(jwtService.sign).toBeCalledWith({
        email: userMock.email,
        subject: userMock.returnedUser.id
      })
      expect(jwtService.sign({
        email: userMock.email,
        subject: userMock.returnedUser.id
      })).toEqual('any-token')
    });

    it('should return a token if a user is found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock.returnedUser);

      await service.login(userMock.email)

      expect(await service.login(userMock.email)).toEqual({
        user: {email: userMock.returnedUser.email},
        accessToken: 'any-token'
      })
    })
  })
});
