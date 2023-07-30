import { Injectable, LoggerService } from "@nestjs/common";
import * as moment from "moment";
import { MESSAGE } from "triple-beam";
import * as winston from "winston";
import { isLogLevel, LogLevel } from "../constants/loglevel.default";
import { ConfigService } from "../../domain/services/config.service";

const formatter = winston.format((debug) => {
  if (debug.level === LogLevel.HTTP) {
    return debug;
  }
  debug.message = `[${moment().format("ddd MMM DD HH:mm:ss YYYY")}] [${
    debug.level
  }] ${debug.message}`;
  return debug;
});

const passthrough = winston.format((debug) => {
  debug[MESSAGE] = debug.message;
  return debug;
});

@Injectable()
export class Logger implements LoggerService {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      level: configService.get().logLevel,
      format: formatter(),
    });
    this.logger.add(
      new winston.transports.Console({
        format: passthrough(),
        stderrLevels: [LogLevel.Error, LogLevel.Warn],
      }),
    );
  }

  //public log(message: string): void;
  public log(p0: LogLevel | string, p1?: string) {
    const logLevel = isLogLevel(p0) ? p0 : LogLevel.Info;
    const message = isLogLevel(p0) && p1 ? p1 : p0;
    this.logger.log(logLevel, message);
  }

  public error(message: string) {
    this.log(LogLevel.Error, message);
  }

  public warn(message: string) {
    this.log(LogLevel.Warn, message);
  }

  public info(message: string) {
    this.log(LogLevel.Info, message);
  }

  public http(message: string) {
    this.log(LogLevel.HTTP, message);
  }

  public verbose(message: string) {
    this.log(LogLevel.Verbose, message);
  }

  public debug(message: string) {
    this.log(LogLevel.Debug, message);
  }

  public silly(message: string) {
    this.log(LogLevel.Silly, message);
  }
}
