/* eslint-disable prettier/prettier */
import { plainToInstance } from "class-transformer";
import { validate, Length } from "class-validator";
import { stringField } from "../../../src/common/helper/stringField.helper";
import { CreateUserDto } from "../../../src/domain/dto/create-user.dto";
import { CreateUserErrors } from "../../../src/domain/enum/create-user-errors.enum.spec";

describe("Create user DTO test suite", () => {
  test("ERROR - should throw error if email is not provided", async () => {
    const data = {
      password: "any-password@123",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).toContain(CreateUserErrors.EMAIL_REQUIRED);
  });

  test("SUCESS - shoult not throw error if email is provided", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).not.toBe(CreateUserErrors.EMAIL_REQUIRED);
  });

  test("ERROR - should throw error if password is not provided", async () => {
    const data = {
      email: "any-email@email.com",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).toContain(CreateUserErrors.PASSWORD_MIN_REQUIREMENTS);
  });

  test("SUCCESS - should not throw if password is provided", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).not.toContain(
      CreateUserErrors.PASSWORDS_MATCH,
    );
  });

  test("ERROR - should throw if confirmPassword is not provided", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).toContain(
      CreateUserErrors.PASSWORDS_MATCH,
    );
  });

  test("SUCCESS - should not throw if confirmPassword is provided", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).not.toContain(
      CreateUserErrors.PASSWORDS_MATCH,
    );
  });

  test("ERROR - should throw if password and confirmPassword are not a match", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
      confirmPassword: "any-otherPassword@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).toContain(CreateUserErrors.PASSWORDS_MATCH);
  });

  test("SUCCESS - should not throw if password and confirmPassword are a match", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password@123",
      confirmPassword: "any-password@123",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).not.toContain(CreateUserErrors.PASSWORDS_MATCH);
  });

  test("ERROR - should throw if password doesn't meet minimum requirements", async () => {
    const data = {
      email: "any-email@email.com",
      password: "any-password",
      confirmPassword: "any-password",
    };
    const createUserDTO = plainToInstance(CreateUserDto, data);
    const errors = await validate(createUserDTO);

    expect(stringField(errors)).toContain(CreateUserErrors.PASSWORD_MIN_REQUIREMENTS);
  });
});
