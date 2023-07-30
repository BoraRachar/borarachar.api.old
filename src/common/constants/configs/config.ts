import { Config } from "./config.interface";

const config: Config = {
  nest: {
    port: 3000,
    portssl: 3001,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: "BoraRachar",
    description:
      "Um serviço para validar e autenticar todas as solicitações passadas para a plataforma",
    version: "1.0",
    path: "api",
  },
  security: {
    expiresIn: "24h",
    refreshIn: "7d",
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
