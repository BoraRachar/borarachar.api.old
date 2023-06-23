import { Injectable } from "@nestjs/common";
import { CreateDemoDto } from "../dto/create-demo.dto";

@Injectable()
export class DemoService {
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
