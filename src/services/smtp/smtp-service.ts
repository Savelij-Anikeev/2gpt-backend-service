import fs from "fs";

import { createTransport } from "nodemailer";
import smtpConfig from "../../smtp/smtp-config";

import SMTPError from "../../exceptions/smtp-error";


class SMTPService {
    private transporter = createTransport(smtpConfig);

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
                from: process.env.SMTP_HOST,
                to: participants,
                html: this.getHTMLTemplate(),
                subject,
            }
            this.transporter.sendMail(sendConfig, (err, info) => {
                if (err) {
                    throw SMTPError.SendError(`${err}`);
                }
                console.log(info);
                
            });
        } catch (err) {
            SMTPError.SendError(`${err}`);
        }
    }
    async verifyConnection() {
        this.transporter.verify(function (error, success) {
            if (error) {
              throw error;
            } else {
              SMTPError.SendError('ok');
            }
          });
    }

}

export default new SMTPService();