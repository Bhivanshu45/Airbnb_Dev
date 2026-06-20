import { NotificationDTO } from "../dto/notification.dto";
import { serverConfig } from "../config/index";
import { renderMailTemplate } from "../template/templates.handler";
import { mailTransporter } from "../config/mail.config";

export const sendEmailService = async (payload: NotificationDTO) => {
    try{
        const html = await renderMailTemplate(payload.templateId, payload.params);
        console.log("Sending email to:", payload.to, "with subject:", payload.subject);
        await mailTransporter.sendMail({
            from: serverConfig.SMTP_FROM,
            to: payload.to,
            subject: payload.subject,
            html: html
        })

    }catch(err){
        console.error("Error rendering email template", err);
        throw err;
    }

}
