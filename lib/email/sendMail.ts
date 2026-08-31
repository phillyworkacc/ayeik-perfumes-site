"use server"
import { websiteConfig } from "@/config/websiteConfig";
import nodemailer from "nodemailer";

type SendEmailProps = {
   to: string;
   subject: string;
   content: string;
};

export default async function sendMail ({ to, subject, content }: SendEmailProps) {
   try {
      const transporter = nodemailer.createTransport({
         service: "gmail",
         secure: true,
         host: "smtp.gmail.com",
         port: 465,
         auth: {
            user: websiteConfig.emailSettings.email,
            pass: process.env.GOOGLE_APP_PASSWORD!
         },
      });
   
      await transporter.sendMail({
         from: `"${websiteConfig.emailSettings.name}" <${websiteConfig.emailSettings.email}>`,
         to, subject, html: content
      });
      return true;
   } catch (e) {
      return false;
   }
}