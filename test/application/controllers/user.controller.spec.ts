import { UserService } from '../../../src/domain/services/user.service';
import { KeyService } from '../../../src/domain/services/key.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/application/controllers/user.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../../../src/domain/dto/create-user.dto';


describe('User Controller test suite', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;
  let keyService: jest.Mocked<KeyService>;
  let data: CreateUserDto

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
  })

  it('should be defined', () => {
    expect(userController).toBeDefined();
  })

  describe('POST - Create user', () => {

    it("ERROR - should throw error if email already exists", async () => {

      userService.createUser.mockRejectedValue(
        new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST)
      )

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response

      await expect(userController.createUser(data, mockRes)).rejects.toThrow()
      await expect(userController.createUser(data, mockRes)).rejects.toEqual(new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST))
    })
  })

})
