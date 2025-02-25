// email.service.ts
import { logger } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(apiKey);
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const msg = {
      to: email,
      from: 'e.guayroso@gmail.com',
      subject: 'Réinitialisation de votre mot de passe',
      text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
      html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    try {
      await sgMail.send(msg);
      // console.log('Email envoyé !');
    } catch (error) {
      logger.error('Erreur lors de l’envoi de l’email:', error.response.body);
      throw error;
    }
  }
}
