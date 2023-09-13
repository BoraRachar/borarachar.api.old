export enum TypeKeys {
  Cadastro = "Cadastro",
  RecuperarSenha = "RecuperarSenha",
  ResendEmailConfirmar = "ResendEmailConfirmar",
}

export const daysValidKeys = 2;

export const defaultCpf = "00000000000";

export const Validade = () => {
  return new Date(Date.now() + daysValidKeys * 24 * 60 * 60 * 1000);
};
