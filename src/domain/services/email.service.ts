import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue("email") private readonly emailQueue: Queue,
    private mailService: MailerService,
  ) {}

  async sendEmailBoasVindas(user: User, key: string) {
    console.info("Start Send Email");
    const confirmUrl = `${process.env.HOST}/user/confirmEmail/${key}`;

    const nome =
      user.nome === null ? user.email : `${user.nome} ${user.sobreNome}`;

    const queue = await this.emailQueue.add("email-job", {
      email: user.email,
      nome: nome,
      url: confirmUrl,
    });
  }
}
