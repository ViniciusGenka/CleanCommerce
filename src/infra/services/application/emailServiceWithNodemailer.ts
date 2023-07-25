import { injectable } from "inversify";
import EmailService from "../../../application/services/emailService";
import * as nodemailer from 'nodemailer'

@injectable()
export class EmailServiceWithNodemailer implements EmailService {
    async sendEmail(from: string, to: string, subject: string, text: string, html: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT),
            secure: false,
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS,
            },
        });
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        });
    }
}