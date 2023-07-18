import { Inject, Injectable } from "@nestjs/common";
import { CreateDemoDto } from "../dto/create-demo.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DemoService {
  findOne(id: number) {
    if (id != null) return new CreateDemoDto();
  }

  findAll() {
    return new CreateDemoDto();
  }

  remove(id: number) {
    if (id != null) return "Deletado com sucesso";
  }
}
