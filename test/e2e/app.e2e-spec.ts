import { AppModule } from "../../src/infrastructure/modules/app.module";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe(`AppController (e2e)`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/ (GET)`, () => {
    return request(app.getHttpServer()).get(`/demo`).expect(200);
  });
});
