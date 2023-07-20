import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { CreateDemoDto } from "../../domain/dto/create-demo.dto";
import { DemoService } from "../../domain/services/demo.service";

@ApiTags("Demo")
@Controller("demo")
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @ApiOkResponse({ description: "The resources were returned successfully" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  findAll() {
    return this.demoService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "The resource was returned successfully" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @ApiNotFoundResponse({ description: "Resource not found" })
  findOne(@Param("id") id: string) {
    return this.demoService.findOne(+id);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "The resource was returned successfully" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @ApiNotFoundResponse({ description: "Resource not found" })
  remove(@Param("id") id: string) {
    return this.demoService.remove(+id);
  }
}
