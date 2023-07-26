import { ConfigData } from "src/domain/entities/interfaces/config.interface";

export const DEFAULT_CONFIG: ConfigData = {
  env: "",
  port: 3000,
  portssl: 3001,
  logLevel: "verbose",
};
