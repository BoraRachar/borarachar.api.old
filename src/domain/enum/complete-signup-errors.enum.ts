export enum CompleteSignupErrors {
  NAME_REQUIRED = "Nome não pode ser vazio.",
  NAME_MIN_LENGTH = "Nome deve ter no mínimo 3 caracteres.",
  NAME_MAX_LENGTH = "Nome deve ter no máximo 50 caracteres.",
  NAME_IS_STRING = "Nome precisa ser uma string.",

  LASTNAME_REQUIRED = "Sobrenome não pode ser vazio.",
  LASTNAME_MIN_LENGTH = "Sobrenome deve ter no mínimo 3 caracteres.",
  LASTNAME_MAX_LENGTH = "Sobrenome deve ter no máximo 50 caracteres.",
  LASTNAME_IS_STRING = "Sobrenome precisa ser uma string.",

  CPF_REQUIRED = "CPF não pode ser vazio.",
  CPF_LENGTH = "CPF deve conter exatamente 11 caracteres.",
  CPF_IS_STRING = "CPF deve ser uma string.",

  TERMS_REQUIRED = "Termos não podem ser vazios.",
  TERMS_BOOLEAN = "Termos deve ser um boolean.",
  TERMS_ARE_TRUE = "Termos devem ser aceitos."
}
