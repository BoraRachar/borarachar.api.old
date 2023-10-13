export class UserResponseDto {
  id: string;
  email: string;
  password: string;
  socialId: string;
  provider: string;
  nome: string;
  sobreNome: string;
  cpf: string;
  termos: boolean;
  validateUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}
