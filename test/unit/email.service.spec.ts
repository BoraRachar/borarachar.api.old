/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '../../src/domain/services/email.service';
import { User } from '@prisma/client';

describe("Email Service Test", () => {
    let emailService: EmailService;
    let mailerService: MailerService;

    const user: User = {
        email: "angelina@gmail.com",
        password: "Abc@6530x",
        id: '',
        socialId: '',
        provider: '',
        nome: '',
        sobreNome: '',
        cpf: '',
        termos: false,
        validateUser: false,
        createdAt: undefined,
        updatedAt: undefined
    }

    const key = 'test_key';

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          EmailService,
          {
            provide: MailerService,
            useValue: {
              sendMail: jest.fn().mockResolvedValue({
                accepted: [user.email],
                rejected: [],
                ehlo: ['SIZE 5242880', 'PIPELINING', 'ENHANCEDSTATUSCODES', '8BITMIME', 'DSN', 'AUTH PLAIN LOGIN CRAM-MD5'],
                envelopeTime: expect.any(Number),
                messageTime: expect.any(Number),
                messageSize: expect.any(Number),
                response: '250 2.0.0 Ok: queued',
                envelope: {
                  from: 'noreply@borarachar.online',
                  to: expect.arrayContaining([user.email]),
                },
                messageId: expect.stringContaining('@borarachar.online'),
              }),
            },
          },
        ],
      }).compile();
  
      emailService = module.get<EmailService>(EmailService);
      mailerService = module.get<MailerService>(MailerService);
    });
    

    describe("SendEmail deliver", () => {
        it("Should send the welcome email to the user", async () => {

            await emailService.sendEmailBoasVindas(user, key);

            expect(mailerService.sendMail).toHaveBeenCalledWith({
                to: user.email,
                subject: 'Bem Vindo ao Bora Rachar! Confirme seu email',
                template: expect.any(String),
                context: {
                  nome: `${user.nome} ${user.sobreNome}`,
                  confirmUrl: expect.any(String),
                },
              })

            });
    });

});