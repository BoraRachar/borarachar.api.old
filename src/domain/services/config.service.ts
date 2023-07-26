import { ConfigData } from "../entities/interfaces/config.interface";
import { DEFAULT_CONFIG } from "../../common/constants/config.default";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      portssl: env.PORTSSL ? parseInt(env.PORTSSL, 10) : DEFAULT_CONFIG.portssl,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
