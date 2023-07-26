import { PrismaModule } from "nestjs-prisma";
import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";
import { AuthGoogleModule } from "./authgoogle.module";
import { AuthInstagramModule } from "./auth-instagram.module";
import { LoggerModule } from "./logger.module";
import { ConfigModule } from "./config.module";
import { InstagramAuthModule } from "@nestjs-hybrid-auth/instagram";

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    InstagramAuthModule.forRoot({
      clientID: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
      callbackURL: `https://${process.env.HOST}:${process.env.PORTSSL}/instagram/callback`,
    }),
    AuthGoogleModule,
    AuthInstagramModule,
  ],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
