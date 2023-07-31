export interface Login {
  user: UserLogin;
  token: Token;
}

export interface UserLogin {
  email: string;
  nome: string;
  provider?: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
