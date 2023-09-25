import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { join } from "path";

@Processor("email")
export class EmailConsumer {
  constructor(private readonly mailService: MailerService) {}

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
  handleSendRecoverPasswordEmail(job: Job) {
    console.info("Send Email Recover Password Queue Start");

    const { email, nome, url } = job.data;

    console.info("Dados email: ", JSON.stringify(job.data));

    this.mailService.sendMail({
      to: email,
      subject: "Recuperar Senha - Bora Rachar",
      template: join(__dirname, "../../common/templates", "recupereSenha"),
      context: {
        nome,
        recoverPasswordUrl: url,
      },
    })
    .then((s) => {
      console.info("SendEmailRecoverPassword success: ", JSON.stringify(s))
    })
    .catch((error) => {
      console.info("SendEmailRecoverPassword error: ", JSON.stringify(error))
    });

    console.info("SendEmailRecoverPassword Queue Complete")
  }
}
