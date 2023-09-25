import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PrismaService } from "nestjs-prisma";
import { join } from "path";

@Processor("email")
export class EmailConsumer {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailerService,
  ) {}

  @Process("email-job")
  handleSendEmail(job: Job) {
    console.info("Send Email Queue Start");

    const { email, nome, url } = job.data;

    console.info("Dados Email: ", JSON.stringify(job.data));

    this.mailService
      .sendMail({
        to: email,
        subject: "Bem Vindo ao Bora Rachar! Confirme seu email",
        template: join(__dirname, "../../common/templates", "bemvindo"),
        context: {
          nome,
          confirmUrl: url,
        },
      })
      .then((s) => {
        console.info("SendEmail success: ", JSON.stringify(s));
      })
      .catch((error) =>
        console.info("SendEmail Error: ", JSON.stringify(error)),
      );

    console.info("Send Email Queue Complete");
  }

  @Process("recover-password-job")
  async handleSendRecoverPasswordEmail(job: Job) {
    console.info("Send Email Recover Password Queue Start");

    const { email, nome, url } = job.data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const sendemail = await this.prisma
      .$queryRaw`SELECT * FROM emails WHERE userId = ${user.id}`;

    console.info("SendEmail: ", sendemail[0]);

    console.info("Dados email: ", JSON.stringify(job.data));

    this.mailService
      .sendMail({
        to: email,
        subject: "Recuperar Senha - Bora Rachar",
        template: join(__dirname, "../../common/templates", "recupereSenha"),
        context: {
          nome,
          recoverPasswordUrl: url,
        },
      })
      .then((s) => {
        //Update enviado
        //await this.prisma.email.update;

        console.info("SendEmailRecoverPassword success: ", JSON.stringify(s));
      })
      .catch((error) => {
        // update error
        console.info("SendEmailRecoverPassword error: ", JSON.stringify(error));
      });

    console.info("SendEmailRecoverPassword Queue Complete");
  }
}
