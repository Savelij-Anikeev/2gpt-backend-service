import fs from "fs";

import { createTransport } from "nodemailer";
import smtpConfig from "../../smtp/smtp-config";

import SMTPError from "../../exceptions/smtp-error";


class SMTPService {
    transporter = createTransport(smtpConfig);

    private getHTMLTemplate() {
        try {
            return fs.readFileSync('../../smtp/templates/base.html', 'utf-8');
        } catch (err) {
            throw SMTPError.CantLoadTemplateError('Can\'t load proper template');
        }
    }

    async sendMail(participants: string[], subject: string): Promise<undefined> {
        try {
            const sendConfig = {
                from: `GPT7 <${process.env.SMTP_HOST}>`,
                to: participants,
                html: this.getHTMLTemplate(),
                subject,
            }
            this.transporter.sendMail(sendConfig)
        } catch (err) {
            SMTPError.SendError('Error while sending email', [err as Error]);
        }
    }

}

export default new SMTPService();