var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new Logger(EmailService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async createTransporter() {
        const clientId = this.configService.get('GMAIL_CLIENT_ID');
        const clientSecret = this.configService.get('GMAIL_CLIENT_SECRET');
        const refreshToken = this.configService.get('GMAIL_REFRESH_TOKEN');
        const gmailUser = this.configService.get('GMAIL_USER');
        if (!clientId || !clientSecret || !refreshToken || !gmailUser) {
            this.logger.error('Gmail OAuth2 não configurado. Defina GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN e GMAIL_USER.');
            return null;
        }
        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground');
        oAuth2Client.setCredentials({ refresh_token: refreshToken });
        const accessTokenResponse = await oAuth2Client.getAccessToken();
        const accessToken = accessTokenResponse.token;
        if (!accessToken) {
            this.logger.error('Não foi possível obter o access token do Gmail.');
            return null;
        }
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: gmailUser,
                clientId,
                clientSecret,
                refreshToken,
                accessToken,
            },
        });
    }
    escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    async sendEmail(message) {
        try {
            const transporter = await this.createTransporter();
            if (!transporter)
                return false;
            const gmailUser = this.configService.get('GMAIL_USER');
            await transporter.sendMail({
                from: `"CortaAí" <${gmailUser}>`,
                to: Array.isArray(message.to) ? message.to.join(', ') : message.to,
                subject: message.subject,
                text: message.text,
                html: message.html,
            });
            return true;
        }
        catch (error) {
            this.logger.error('Erro ao enviar e-mail via Gmail:', error);
            return false;
        }
    }
    async sendVerificationCode(to, code, nome) {
        const safeName = this.escapeHtml(nome);
        return this.sendEmail({
            to,
            subject: 'Código de verificação - CortaAí',
            text: `Olá ${nome},\n\nUse o código ${code} para verificar seu e-mail.\n\nEste código expira em 15 minutos. Se você não criou esta conta, ignore este e-mail.`,
            html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #f5f5f5;">
          <div style="background: #fff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #071522; font-size: 1.5rem; margin: 0 0 8px;">✂️ CortaAí</h1>
              <p style="color: #666; margin: 0;">Confirme seu e-mail</p>
            </div>

            <p style="color: #333; font-size: 0.95rem;">Olá <strong>${safeName}</strong>,</p>
            <p style="color: #333; font-size: 0.95rem;">Use o código abaixo para verificar seu e-mail:</p>

            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background: #071522; color: #fff; font-size: 2rem; font-weight: 700; letter-spacing: 0.4em; padding: 16px 32px; border-radius: 12px;">
                ${code}
              </div>
            </div>

            <p style="color: #666; font-size: 0.85rem; text-align: center;">
              Este código expira em <strong>15 minutos</strong>.<br>
              Se você não criou esta conta, ignore este e-mail.
            </p>
          </div>
        </div>
      `,
        });
    }
    async sendPasswordReset(to, resetUrl, nome) {
        const safeName = this.escapeHtml(nome);
        return this.sendEmail({
            to,
            subject: 'Redefinição de senha - CortaAí',
            text: `Olá ${nome},\n\nClique no link abaixo para redefinir sua senha:\n${resetUrl}\n\nEste link expira em 1 hora. Se você não solicitou a redefinição, ignore este e-mail.`,
            html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #f5f5f5;">
          <div style="background: #fff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #071522; font-size: 1.5rem; margin: 0 0 8px;">✂️ CortaAí</h1>
              <p style="color: #666; margin: 0;">Redefinição de senha</p>
            </div>

            <p style="color: #333; font-size: 0.95rem;">Olá <strong>${safeName}</strong>,</p>
            <p style="color: #333; font-size: 0.95rem;">Recebemos uma solicitação de redefinição de senha para sua conta.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: #071522; color: #fff; font-size: 1rem; font-weight: 600; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
                Redefinir senha
              </a>
            </div>

            <p style="color: #666; font-size: 0.85rem; text-align: center;">
              Este link expira em <strong>1 hora</strong>.<br>
              Se você não solicitou a redefinição, ignore este e-mail.
            </p>
          </div>
        </div>
      `,
        });
    }
};
EmailService = EmailService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], EmailService);
export { EmailService };
//# sourceMappingURL=email.service.js.map