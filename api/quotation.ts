import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface QuotationData {
  projectDetails?: {
    country: string;
    city: string;
    businessModel: string;
    squareMeters: number;
    currency: string;
    fee: {
      thb: number;
      converted: number;
      displayCurrency: string;
    };
    timeline: string;
  };
  contactInfo: {
    email: string;
    name?: string;
    company?: string;
    phone?: string;
  };
  timestamp: string;
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
    const data: QuotationData = req.body;

    // Basic validation
    if (!data.contactInfo?.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactInfo.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Format the email content
    const projectDetails = data.projectDetails;
    let projectDetailsHTML = '';

    if (projectDetails) {
      projectDetailsHTML = `
        <div class="field">
          <div class="label">Location:</div>
          <div class="value">${projectDetails.city}, ${projectDetails.country}</div>
        </div>

        <div class="field">
          <div class="label">Business Model:</div>
          <div class="value">${projectDetails.businessModel}</div>
        </div>

        <div class="field">
          <div class="label">Square Meters:</div>
          <div class="value">${projectDetails.squareMeters} m²</div>
        </div>

        <div class="field">
          <div class="label">Estimated Fee:</div>
          <div class="value">
            ${projectDetails.fee.displayCurrency} ${projectDetails.fee.converted.toLocaleString()}
            ${projectDetails.currency !== 'THB' ? `(฿${projectDetails.fee.thb.toLocaleString()} THB)` : ''}
          </div>
        </div>

        <div class="field">
          <div class="label">Timeline:</div>
          <div class="value">${projectDetails.timeline}</div>
        </div>
      `;
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Cracks Studio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: data.contactInfo.email,
      subject: `New Quotation Request from ${data.contactInfo.email}`,
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
              .highlight { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Quotation Request</h2>
              </div>
              <div class="content">
                <h3>Contact Information</h3>

                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${data.contactInfo.email}">${data.contactInfo.email}</a></div>
                </div>

                ${data.contactInfo.name ? `
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${data.contactInfo.name}</div>
                </div>
                ` : ''}

                ${data.contactInfo.company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${data.contactInfo.company}</div>
                </div>
                ` : ''}

                ${data.contactInfo.phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${data.contactInfo.phone}</div>
                </div>
                ` : ''}

                ${projectDetails ? '<h3>Project Details</h3>' : ''}
                ${projectDetailsHTML}

                <div class="highlight">
                  <strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Quotation request submitted successfully',
    });

  } catch (error) {
    console.error('Quotation form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
