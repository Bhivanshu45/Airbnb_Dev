import { Job, Worker } from "bullmq";
import { NotificationDTO } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { redisClient } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { sendEmailService } from "../services/email.service";

export const setupMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name != MAILER_PAYLOAD) {
        throw new Error("Invalid job type");
      }

      // call the email service layer
      const payload = job.data;
      console.log(`Processing email job: ${JSON.stringify(payload)}`);
      await sendEmailService(payload);
      console.log(`Email job processed successfully for: ${payload.to}`);
    },
    {
      connection: redisClient() as any,
    },
  );

  emailProcessor.on("failed", () => {
    console.error("Email processing failed");
  });

  emailProcessor.on("completed", () => {
    console.log("Email processed successfully");
  });
};
