import { UserService } from '../../../src/domain/services/user.service';
import { KeyService } from '../../../src/domain/services/key.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/application/controllers/user.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../../../src/domain/dto/create-user.dto';
import { keyMock, tokenMock, userMock } from '../../mocks/index';


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
      json: jest.fn(),
      redirect: jest.fn()
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

      await userController.createUser(data, mockRes);

      expect(userService.createUser).toHaveBeenCalledWith(data);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    })
  })

  describe("GET - confirmEmail", () => {

    it('SUCCESS - should invoke keyService with correct params', async () => {

      await userController.confirmUser(keyMock.keyValue, mockRes);

      expect(keyService.confirmEmailCadastro).toHaveBeenCalledWith(keyMock.keyValue);
      expect(keyService.confirmEmailCadastro).toHaveBeenCalledTimes(1)
    })

    it('SUCCESS - should redirect to the complete registration URL page if key is found', async () => {

      keyService.confirmEmailCadastro.mockResolvedValue(keyMock.signUpValidKey);

      const completeRegistrationURL = `http://borarachar.online/register/complete/${tokenMock.validToken}`;

      await userController.confirmUser(keyMock.signUpValidKey.value, mockRes);

      expect(mockRes.redirect).toHaveBeenCalledWith(completeRegistrationURL);
    })

    it("SUCCESS - should redirect to home page if key is not found", async () => {

      keyService.confirmEmailCadastro.mockResolvedValue(null);

      const homePageURL = `http://borarachar.online`;

      await userController.confirmUser(keyMock.signUpValidKey.value, mockRes);

      expect(mockRes.redirect).toHaveBeenCalledWith(homePageURL);
    })
  })

  describe("GET - getUserByToken", () => {

    it("SUCCESS - should call userService with correct params", async () => {

      const userId = tokenMock.validToken.split("$")[0];
      userService.findOneUserById.mockResolvedValue(userMock.validUser)

      await userController.getUserByToken(tokenMock.validToken, mockRes)

      expect(userService.findOneUserById).toHaveBeenCalledWith(userId)
      expect(userService.findOneUserById).toHaveBeenCalledTimes(1);
    })

    it("SUCCESS - should return status ok if user exists", async () => {

      userService.findOneUserById.mockResolvedValue(userMock.validUser)

      const response = {
        statusCode: HttpStatus.OK,
        message: {
          userId: userMock.validUser.id,
          email: userMock.validUser.email
        }
      };

      await userController.getUserByToken(tokenMock.validToken, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(response.statusCode);
      expect(mockRes.json).toHaveBeenCalledWith(response.message)
    })

    it("ERROR - should throw if token is invalid", async () => {

      userService.findOneUserById.mockResolvedValue(null)

      const response = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Token inválido"
      };

      await expect(userController.getUserByToken(tokenMock.invalidToken, mockRes)).rejects.toThrow(
        new HttpException("Token inválido", HttpStatus.BAD_REQUEST)
      );
  })

  })

  describe("PUT - completeSignUp", () => {
    it("SUCCESS - should call userService with correct params", async () => {
      await userController.completeSignUp(userMock.validId, userMock.validCompleteSignData, mockRes);

      expect(userService.completeSignUp).toHaveBeenCalledWith(userMock.validId, userMock.validCompleteSignData);
      expect(userService.completeSignUp).toHaveBeenCalledTimes(1);

    })

    it("SUCCESS - should redirect to successfully registration page if userService returns", async () => {

      userService.completeSignUp.mockResolvedValue(userMock.updatedUser);

      const successRegistrationURL = `http://borarachar.online/register/successfully`;

      await userController.completeSignUp(userMock.validId, userMock.validCompleteSignData, mockRes)

      expect(mockRes.redirect).toHaveBeenCalledWith(successRegistrationURL)
      expect(mockRes.redirect).toHaveBeenCalledTimes(1)
    })

    it("ERROR - should throw if userService throws", async () => {

      const error = new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);

      userService.completeSignUp.mockRejectedValue(error);

      await expect(userController.completeSignUp(userMock.validId, userMock.validCompleteSignData, mockRes)).rejects.toThrow(error);
    })
  })
})
