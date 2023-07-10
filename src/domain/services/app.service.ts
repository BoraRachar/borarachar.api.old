import { Injectable } from "@nestjs/common";

export class AppService {
  getHello(): string {
    return `Hello World!`;
  }
}
