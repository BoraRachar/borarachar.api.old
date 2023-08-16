import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("email")
export class EmailConsumer {
  @Process("email-job")
  handleSendEmail(job: Job) {
    console.info("Send Email Queue Start");
    console.info(job.data);
    console.info("Send Email Queue Complete");
  }
}
