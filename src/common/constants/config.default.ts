import { ConfigData } from "src/domain/entities/interfaces/config.interface";

export const DEFAULT_CONFIG: ConfigData = {
  env: "",
  port: 3000,
  portssl: 3001,
  logLevel: "debug",
  JWT_SECRET: "E4026B5A2CB4E5F65788747009761D38",
};
