import { UserService } from '../../../src/domain/services/user.service';
import { KeyService } from '../../../src/domain/services/key.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/application/controllers/user.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../../../src/domain/dto/create-user.dto';
import { Key } from '@prisma/client';


describe('User Controller test suite', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;
  let keyService: jest.Mocked<KeyService>;
  let data: CreateUserDto;
  let mockRes: Response;

  beforeEach(async () => {

    const keyServiceMock = {
      confirmEmailCadastro: jest.fn(),
      createKeyConfirmEmail: jest.fn(),
      prisma: jest.fn()
    } as unknown as KeyService;

    const userServiceMock = {
      findOneUserbyEmail: jest.fn(),
      findOneUserbySocialId: jest.fn(),
      findOneUserById: jest.fn(),
      socialUserCreate: jest.fn(),
      createUser: jest.fn(),
      completeSignUp: jest.fn(),
    } as unknown as UserService;

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    data = {
      email: 'any-email@email.com',
      password: 'any-password',
      confirmPassword: 'any-password'
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService, useValue: userServiceMock
        },
        {
          provide: KeyService, useValue: keyServiceMock
        },
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get(UserService);
    keyService = module.get(KeyService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be defined', () => {
    expect(userController).toBeDefined();
  })

  describe('POST - Create user', () => {

    it("ERROR - should throw error if email already exists", async () => {

      userService.createUser.mockRejectedValue(
        new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST)
      )

      await expect(userController.createUser(data, mockRes)).rejects.toThrow()
      await expect(userController.createUser(data, mockRes)).rejects.toEqual(new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST))
    })

    it("SUCCESS - should return when a user is created", async () => {

      const response = {
        message: "Usuario criado com sucesso"
      }

      userService.createUser.mockResolvedValue(response)

      await userController.createUser(data, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith(response);
    })

    it("SUCCESS - should call userService with correct params", async () => {

      const response = {
        message: "Usuario criado com sucesso"
      }

      const user = await userController.createUser(data, mockRes);

      expect(userService.createUser).toHaveBeenCalledWith(data);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    })
  })

  describe("GET - confirmEmail", () => {
    const key: Key = {
      id: 1,
      userId: 'any-userId',
      value: 'any-value',
      validate: new Date(),
      expiresIn: 1,
      status: true
    };

    const token = `${key.userId}$${process.env.JWT_SECRET}`
    const urlWithToken = `www.borarachar.online/register/complete/${token}`
    const urlWithoutToken = "www.borarachar.online"

    it('SUCCESS - should invoke keyService with correct params', async () => {

      await userController.confirmUser(key.value, mockRes);

      expect(keyService.confirmEmailCadastro).toHaveBeenCalledWith(key.value);
      expect(keyService.confirmEmailCadastro).toHaveBeenCalledTimes(1)
    })

    it('SUCCESS - should return if key exists', async () => {

      keyService.confirmEmailCadastro.mockResolvedValue(key);

      const response = {
        statusCode: HttpStatus.ACCEPTED,
        url: urlWithToken
      }

      expect(await userController.confirmUser(key.value, mockRes)).toEqual(response);
    })

    it("ERROR - should return status 302 if key doesn't exist", async () => {

      keyService.confirmEmailCadastro.mockResolvedValue(null);

      const response = {
        statusCode: HttpStatus.FOUND,
        url: urlWithoutToken
      }

      expect(await userController.confirmUser(key.value, mockRes)).toEqual(response);
    })
  })

})
