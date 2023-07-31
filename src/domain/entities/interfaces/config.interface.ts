export interface ConfigData {
  env: string;
  port: number;
  portssl: number;
  logLevel?: string;
  JWT_SECRET?: string;
}
