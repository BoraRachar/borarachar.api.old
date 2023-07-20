import { validate } from "class-validator";
import { LoginInfoDto } from "../../src/domain/dto/login.dto";

describe("LoginDto", () => {
  const loginInfoDto = new LoginInfoDto();

  beforeEach(() => {
    loginInfoDto.email = "mock@email.com";
    loginInfoDto.password = "!!AAmock";
  });

  it("Should be possible to create the valid login", async () => {
    const error = await validate(loginInfoDto);
    expect(error.length).toBe(0);
  });

  it("Should not be possible to create the valid login", async () => {
    const error = await validate(new LoginInfoDto());
    expect(error.length).toBe(2);
  });

  describe("email", () => {
    it("Should not be possible to create the login without an email", async () => {
      loginInfoDto.email = "";

      expect(await validate(loginInfoDto)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ property: "email" }),
        ]),
      );
    });

    it("Should not be possible to create the login with an invalid email", async () => {
      loginInfoDto.email = "mock@email";

      expect(await validate(loginInfoDto)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ property: "email" }),
        ]),
      );
    });
  });

  describe("password", () => {
    it("Should not be possible to create the login without an password", async () => {
      loginInfoDto.password = "";

      expect(await validate(loginInfoDto)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ property: "password" }),
        ]),
      );
    });

    it("Should not be possible to create the login with a password of less than 8 characters", async () => {
      loginInfoDto.password = "mock";

      expect(await validate(loginInfoDto)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ property: "password" }),
        ]),
      );
    });
  });
});
