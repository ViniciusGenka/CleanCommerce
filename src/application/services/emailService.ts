export default interface EmailService {
    sendEmail(
        from: string, 
        to: string,
        subject: string,
        text: string,
        html: string
    ): Promise<void>
}