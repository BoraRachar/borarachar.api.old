import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { stringField } from '../../../src/common/helper/stringField.helper';
import { CompleteSignUpDTO } from '../../../src/domain/dto/complete-signup.dto';
import { CompleteSignupErrors } from '../../../src/domain/enum/complete-signup-errors.enum';


describe('Complete signup DTO test suite', () => {

  describe('nome test', () => {
    it("ERROR - should throw if name is not provided", async () => {

      const data = {
        sobreNome: "any-lastname",
        cpf: "01234567890",
        termos: true
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.NAME_REQUIRED)
    })

    it("SUCCESS - should not throw if name is provided", async () => {

      const data = {
        nome: "any-name"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.NAME_REQUIRED);
    })

    it("ERROR - should throw if name doesn't meet 3 min characters requirement", async () => {

      const data = {
        nome: "ab"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.NAME_MIN_LENGTH)
    })

    it("SUCCESS - should not throw if name has at least 3 characters", async () => {

      const data = {
        nome: "abc"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.NAME_MIN_LENGTH);
    })

    it("ERROR - should throw if name has more than 50 characters", async () => {

      const data = {
        nome: "abcdefghijlmnopqrstuvzyzssssssddbdsntjhfjyffj jfgfnfgbcbbrdfbzngngfn"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.NAME_MAX_LENGTH);
    })

    it("SUCCESS - should not throw if name has less than 50 characters", async () => {

      const data = {
        nome: "abcdefghijlmnopq"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.NAME_MAX_LENGTH);
      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.NAME_MIN_LENGTH);
    })

    it("ERROR - should throw if name is not a string", async () => {

      const data = {
        nome: 84948
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.NAME_IS_STRING);
    })
  });

  describe('sobreNome test', () => {
    it("ERROR - should throw if lastName is not provided", async () => {

      const data = {
        cpf: "01234567890",
        termos: true
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.LASTNAME_REQUIRED)
    })

    it("SUCCESS - should not throw if lastName is provided", async () => {

      const data = {
        sobreNome: "any-lastName"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.LASTNAME_REQUIRED);
    })

    it("ERROR - should throw if lastName doesn't meet 3 min characters requirement", async () => {

      const data = {
        sobreNome: "ab"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.LASTNAME_MIN_LENGTH);
    })

    it("SUCCESS - should not throw if lastName has at least 3 characters", async () => {

      const data = {
        sobreNome: "abc"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.LASTNAME_MIN_LENGTH);
    })

    it("ERROR - should throw if lastName has more than 50 characters", async () => {

      const data = {
        sobreNome: "abcdefghijlmnopqrstuvzyzssssssddbdsntjhfjyffj jfgfnfgbcbbrdfbzngngfn"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.LASTNAME_MAX_LENGTH);
    })

    it("SUCCESS - should not throw if lastName has less than 50 characters", async () => {

      const data = {
        sobreNome: "abcdefghijlmnopq"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.LASTNAME_MAX_LENGTH);
      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.LASTNAME_MIN_LENGTH);
    })

    it("ERROR - should throw if lastName is not a string", async () => {

      const data = {
        sobreNome: 84948
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.LASTNAME_IS_STRING);
    })
  });

  describe('cpf test', () => {
    it("ERROR - should throw if cpf is not provided", async () => {

      const data = {
        termos: true
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.CPF_REQUIRED)
    })

    it("SUCCESS - should not throw if cpf is provided", async () => {

      const data = {
        cpf: "any-cpf"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.CPF_REQUIRED);
    })

    it("ERROR - should throw if cpf doesn't meet 11  characters requirement", async () => {

      const data = {
        cpf: "012345"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.CPF_LENGTH);
    })

    it("SUCCESS - should not throw if cpf has 11 characters", async () => {

      const data = {
        cpf: "01234567890"
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.CPF_LENGTH);
    })

    it("ERROR - should throw if lastName is not a string", async () => {

      const data = {
        cpf: 12345678912,
      };

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.CPF_IS_STRING);
    })
  });

  describe("termos test", () => {
    it("ERROR - should throw if terms are not provided", async () => {

      const data = {
        sobreNome: "any-lastname",
        cpf: "01234567890",
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.TERMS_REQUIRED)
    })

    it("SUCCESS - should not throw if terms are provided", async () => {

      const data = {
        termos: false
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.TERMS_REQUIRED);
    })

    it("ERROR - should throw if terms are false", async () => {

      const data = {
        termos: false,
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.TERMS_ARE_TRUE)
    })

    it("SUCCESS - should not throw if terms are true", async () => {

      const data = {
        termos: true,
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).not.toContain(CompleteSignupErrors.TERMS_ARE_TRUE)
    })

    it("ERROR - should throw if terms are not a boolean", async () => {

      const data = {
        termos: "any-terms",
      }

      const completeSignUp = plainToInstance(CompleteSignUpDTO, data);
      const errrors = await validate(completeSignUp);

      expect(stringField(errrors)).toContain(CompleteSignupErrors.TERMS_BOOLEAN)
      expect(stringField(errrors)).toContain(CompleteSignupErrors.TERMS_ARE_TRUE)
    })

  })
})
