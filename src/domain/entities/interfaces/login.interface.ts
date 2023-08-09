export interface Login {
  user: UserLogin;
  token: Token;
}

export interface UserLogin {
  email: string;
  nome: string;
  sobreNome: string;
  provider?: string;
  validateUser: boolean;
  termos: boolean;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
