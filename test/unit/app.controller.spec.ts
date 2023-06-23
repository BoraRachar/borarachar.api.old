import { AppController } from "../../src/application/controllers/app.controller";
import { AppService } from "../../src/domain/services/app.service";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

describe(`AppController`, () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe(`root`, () => {
    it(`should return "Hello World!"`, () => {
      expect(appController.getHello()).toBe(`Hello World!`);
    });
  });
});
