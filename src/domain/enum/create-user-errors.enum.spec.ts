export enum CreateUserErrors {
  EMAIL_REQUIRED = "Email não pode ser vazio",
  PASSWORD_REQUIRED = "Senha não pode ser vazia.",
  CONFIRM_PASSWORD_REQUIRED = "Confirmação de senha não pode ser vazio",
  PASSWORDS_MATCH = "Confirmação de senha deve ser igual a senha informada.",
  PASSWORD_MIN_REQUIREMENTS = "Senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial"
}
