import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class AppService {
  public config: ConfigService;

  getHello(): string {
    return `Hello World!`;
  }
}
