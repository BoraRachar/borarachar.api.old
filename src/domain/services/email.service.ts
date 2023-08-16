import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { join } from "path";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue("email") private readonly emailQueue: Queue,
    private mailService: MailerService,
  ) {}

  async sendEmailTest(user: User, key: string) {
    await this.emailQueue.add("email-job", {
      user: user,
      key: key,
    });
  }

  async sendEmailBoasVindas(user: User, key: string) {
    const confirmUrl = `${process.env.HOST}/user/confirmEmail/${key}`;

    const nome =
      user.nome === null ? user.email : `${user.nome} ${user.sobreNome}`;

    await this.sendEmailTest(user, key);

    const sendEmail = await this.mailService.sendMail({
      to: user.email,
      subject: "Bem Vindo ao Bora Rachar! Confirme seu email",
      template: join(__dirname, "../../common/templates", "bemvindo"),
      context: {
        nome,
        confirmUrl,
      },
    });

    console.log("SendEmail: ", JSON.stringify(sendEmail));
  }
}
