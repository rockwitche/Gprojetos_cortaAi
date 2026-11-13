import { ConfigService } from '@nestjs/config';
export interface EmailMessage {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
}
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    private createTransporter;
    private escapeHtml;
    sendEmail(message: EmailMessage): Promise<boolean>;
    sendVerificationCode(to: string, code: string, nome: string): Promise<boolean>;
    sendPasswordReset(to: string, resetUrl: string, nome: string): Promise<boolean>;
}
