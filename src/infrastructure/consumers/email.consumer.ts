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
}
