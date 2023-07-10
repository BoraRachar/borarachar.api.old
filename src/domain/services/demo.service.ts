import { Inject, Injectable } from "@nestjs/common";
import { CreateDemoDto } from "../dto/create-demo.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DemoService {
  @Inject(ConfigService)
  public config: ConfigService;

  create(createDto: CreateDemoDto) {
    return new CreateDemoDto();
  }

  findOne(id: number) {
    return new CreateDemoDto();
  }

  findAll() {
    return new CreateDemoDto();
  }

  remove(id: number) {
    return "Deletado com sucesso";
  }
}
