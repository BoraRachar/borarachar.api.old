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

  beforeEach(async () => {

    const mockPrisma = {
      user: {
        findUnique: jest.fn(),
      }
    }

    const mockComparePass = () => {

    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, {provide: PrismaService, useValue: mockPrisma}, {provide: HashPassword, useFactory: () => mockComparePass()}],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
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

    it('should pass the correct param to prisma', async () => {

      await service.validateUser(email, password)

      expect(prisma.user.findUnique).toBeCalledWith({
        where: { email }
      })
    });

    // it('should call comparePass if prisma returns a user', async () => {
    //   (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)
    //   await service.validateUser(email, password)

    // });
  });
});
