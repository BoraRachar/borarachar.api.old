import { TypeKeys } from "../../src/common/constants/key.default";

export default {
  signUpValidKey: {
    id: 1,
    userId: "any-userId",
    value: "any-value",
    validate: new Date(),
    expiresIn: 1,
    status: true,
    type: TypeKeys.Cadastro
  },
  recoverPasswordValidKey: {
    id: 1,
    userId: "any-userId",
    value: "any-value",
    validate: new Date(),
    expiresIn: 1,
    status: true,
    type: TypeKeys.RecuperarSenha
  },
  resendConfirmEmailValidKey: {
    id: 1,
    userId: "any-userId",
    value: "any-value",
    validate: new Date(),
    expiresIn: 1,
    status: true,
    type: TypeKeys.ResendEmailConfirmar
  },
  keyValue: "any-value",
  invalidKeyValue: "invalid-keyValue"
};
