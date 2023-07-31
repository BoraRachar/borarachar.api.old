import { Test, TestingModule } from "@nestjs/testing";
import { AuthFacebookController } from "../../src/application/controllers/auth-facebook.controller";

describe("AuthFacebookController", () => {
  let controller: AuthFacebookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthFacebookController],
    }).compile();

    controller = module.get<AuthFacebookController>(AuthFacebookController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
