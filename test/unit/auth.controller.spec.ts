import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../../src/application/controllers/auth.controller";
import { AuthService } from "../../src/domain/services/auth.service";
import { PrismaModule } from "nestjs-prisma";
import { PrismaService } from "../../src/domain/services/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { InternalServerErrorException } from "@nestjs/common";
import { HashPassword } from "../../src/domain/core/hashPassword";

describe("AuthController", () => {
  let controller: AuthController;

  const mockService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: "2h" },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService, HashPassword],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("POST - Login", () => {
    it("should throw if service throws", async () => {
      mockService.login.mockResolvedValue(new InternalServerErrorException());

      await expect(
        controller.login({
          email: "invalid-email",
          password: "invalid-password",
        }),
      ).rejects.toThrow();
    });

    it('should return if service returns', async () => {
      // mockService.login.mockResolvedValue()
    });
  });
});
