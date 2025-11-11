import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  fullName: string;
  company: string;
  telephone: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: ContactFormData = req.body;

    // Basic validation
    if (!data.fullName || !data.email || !data.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email to business owner
    await transporter.sendMail({
      from: `"Cracks Studio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: data.email,
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0f172a; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
              .content { background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0f172a; }
              .value { margin-top: 5px; }
              .message-box { background-color: white; padding: 15px; border-left: 4px solid #0f172a; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${data.fullName}</div>
                </div>

                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${data.company}</div>
                </div>

                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Telephone:</div>
                  <div class="value">${data.telephone}</div>
                </div>

                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${data.subject}</div>
                </div>

                <div class="field">
                  <div class="label">Message:</div>
                  <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Cracks Hospitality Studio" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: 'Thank you for contacting Cracks Hospitality Studio',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0f172a; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
              .content { background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
              .footer { background-color: #0f172a; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; margin-top: 20px; }
              .footer a { color: white; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Your Interest!</h2>
              </div>
              <div class="content">
                <p>Hi ${data.fullName},</p>

                <p>Thank you for reaching out to Cracks Hospitality Studio. We have received your message and will get back to you within 24-48 hours.</p>

                <p><strong>Your message:</strong></p>
                <p style="background-color: white; padding: 15px; border-left: 4px solid #0f172a;">${data.message.replace(/\n/g, '<br>')}</p>

                <p>In the meantime, feel free to explore our services at <a href="https://cracks-studio.com">cracks-studio.com</a>.</p>

                <p>Best regards,<br>
                The Cracks Hospitality Studio Team</p>
              </div>
              <div class="footer">
                <p>Cracks Hospitality Studio | Bangkok, Thailand</p>
                <p>
                  <a href="https://www.linkedin.com/company/cracks-hospitality-studio">LinkedIn</a> |
                  <a href="https://www.instagram.com/crackshospitalitystudio">Instagram</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
