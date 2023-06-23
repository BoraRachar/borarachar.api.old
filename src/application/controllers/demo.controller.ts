import { Controller, Get } from "@nestjs/common";
import { AppService } from "../../domain/services/app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Demo")
@Controller("demo")
export class DemoController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
