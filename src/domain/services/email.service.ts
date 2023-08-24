import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class EmailService {
  constructor(@InjectQueue("email") private readonly emailQueue: Queue) {}

  async sendEmailBoasVindas(user: User, key: string) {
    console.info("Start Send Email");
    const confirmUrl = `${process.env.HOST}/user/confirmEmail/${key}`;
    console.info("Url: ", confirmUrl);

    const nome =
      user.nome === null ? user.email : `${user.nome} ${user.sobreNome}`;

    console.info("Nome: ", nome);

    const queue = await this.emailQueue.add(
      "email-job",
      {
        email: user.email,
        nome: nome,
        url: confirmUrl,
      },
      { priority: 2, delay: 3000, lifo: true },
    );

    const isCompleted = await queue.isCompleted();
    console.info("Queue status: ", isCompleted);

    return isCompleted;
  }
}
