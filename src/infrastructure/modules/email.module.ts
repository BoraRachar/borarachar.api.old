import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { EmailService } from "src/domain/services/email.service";
import { BullModule } from "@nestjs/bull";
import { EmailConsumer } from "../consumers/email.consumer";

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: "email",
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"),
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_KEY"),
          },
        },
        defaults: {
          from: "suporte.borarachar@gmail.com",
        },
        template: {
          dir: "../../common/templates",
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService],
})
export class EmailModule {}
