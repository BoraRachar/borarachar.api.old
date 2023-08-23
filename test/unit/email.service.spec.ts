/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '../../src/domain/services/email.service';
import { User } from '@prisma/client';

describe("Email Service Test", () => {
    let emailService: EmailService;

    const user: User = {
        email: "angelina@gmail.com",
        password: "Abc@6530x",
        id: '',
        socialId: '',
        provider: '',
        nome: 'any-name',
        sobreNome: 'any-lastname',
        cpf: '',
        termos: false,
        validateUser: false,
        createdAt: undefined,
        updatedAt: undefined
    }

    const emailQueueMock = {
      add: jest.fn().mockImplementation((jobName, jobData, jobOptions) => {
        return {
          isCompleted: jest.fn().mockResolvedValue({})
        }
      })
    };

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
          {
            provide: 'BullQueue_email',
            useValue: emailQueueMock
          }
        ],
      }).compile();

      emailQueueMock.add.mockClear();

      emailService = module.get<EmailService>(EmailService);
    });


    describe("SendEmail deliver", () => {
        it("SUCCESS - should add emailJob to the queue", async () => {

            const confirmUrl = `${process.env.HOST}/user/confirmEmail/${key}`
            const nome =
            user.nome === null ? user.email : `${user.nome} ${user.sobreNome}`;

            await emailService.sendEmailBoasVindas(user, key);

            expect(emailQueueMock.add).toHaveBeenCalledWith(
              "email-job",
              {
              email: user.email,
              nome: nome,
              url:confirmUrl
              },
              { priority: 2, delay: 3000, lifo: true }
            )
            });
    });

});
