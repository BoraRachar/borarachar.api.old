import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { join } from "path";

@Processor("email")
export class EmailConsumer {
  constructor(private readonly mailService: MailerService) {}

  @Process("email-job")
  async handleSendEmail(job: Job) {
    console.info("Send Email Queue Start");

    const { email, nome, url } = job.data;

    const sendEmail = await this.mailService.sendMail({
      to: email,
      subject: "Bem Vindo ao Bora Rachar! Confirme seu email",
      template: join(__dirname, "../../common/templates", "bemvindo"),
      context: {
        nome,
        confirmUrl: url,
      },
    });

    console.info("SendEmail: ", JSON.stringify(sendEmail));

    console.info("Send Email Queue Complete");
  }
}
