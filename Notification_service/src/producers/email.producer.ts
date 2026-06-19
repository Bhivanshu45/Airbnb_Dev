import { mailerQueue } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";

export const MAILER_PAYLOAD = "payload:mail";

export const addEmailToQueue = async(payload:NotificationDTO) => {
    try {
        await mailerQueue.add(MAILER_PAYLOAD,payload);
        console.log(`Email added to queue: ${JSON.stringify(payload)}`);
    }
    catch(err){
        console.error("Error adding email to queue", err);
    }
}