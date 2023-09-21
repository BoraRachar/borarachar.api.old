import { Module } from "@nestjs/common";
import { ForgotPasswordController } from "src/application/controllers/forgotPassword.controller";
import { UserService } from "src/domain/services/user.service";
import { UserController } from '../../application/controllers/user.controller';
import { PrismaService } from '../../domain/services/prisma.service';
import { KeyService } from '../../domain/services/key.service';
import { EmailService } from '../../domain/services/email.service';
import { EmailModule } from './email.module';

@Module({
  imports: [EmailModule],
  controllers: [UserController, ForgotPasswordController],
  providers: [UserService, PrismaService, KeyService]
})
export class UserModule{}
