import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/domain/services/auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from '../../src/domain/services/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

describe("AuthController", () => {
  let service: AuthService;
  let jwtService: JwtService;
  let prisma: PrismaService

  const email = 'any-email';
  const password = 'any-password'

  beforeEach(async () => {

    const mockPrisma = {
      user: {
        findUnique: jest.fn(),
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, {provide: PrismaService, useValue: mockPrisma}],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService)
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

    it('should pass the right param to prisma', async () => {

      await service.validateUser(email, password)

      expect(prisma.user.findUnique).toBeCalledWith({
        where: { email }
      })
    });
  });
});
