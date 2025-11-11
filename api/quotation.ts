import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Support both data formats
interface QuotationDataDetailed {
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

interface QuotationDataPackage {
  package: string;
  squareMeters: number;
  country: string;
  city: string;
  currency: string;
  email: string;
  calculatedPrice: {
    thb: number;
    selected: number;
    currency: string;
  };
  discountApplied: number;
  travelSupplement: number;
  timeline: string;
}

type QuotationData = QuotationDataDetailed | QuotationDataPackage;

// Type guard
function isPackageFormat(data: QuotationData): data is QuotationDataPackage {
  return 'package' in data;
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

    // Extract email based on format
    const userEmail = isPackageFormat(data) ? data.email : data.contactInfo.email;

    // Basic validation
    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
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

    // Build email content based on data format
    let businessOwnerEmailHTML = '';
    let userConfirmationHTML = '';

    if (isPackageFormat(data)) {
      // Package card format
      const packageNames: { [key: string]: string } = {
        bronze: 'BLUEPRINT',
        silver: 'FRAMEWORK',
        gold: 'LAUNCH'
      };

      businessOwnerEmailHTML = `
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
                <h2>New Package Quotation Request</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Package:</div>
                  <div class="value">${packageNames[data.package] || data.package.toUpperCase()}</div>
                </div>

                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Location:</div>
                  <div class="value">${data.city}, ${data.country}</div>
                </div>

                <div class="field">
                  <div class="label">Square Meters:</div>
                  <div class="value">${data.squareMeters} m²</div>
                </div>

                <div class="field">
                  <div class="label">Calculated Price:</div>
                  <div class="value">
                    ${data.calculatedPrice.currency} ${data.calculatedPrice.selected.toLocaleString()}
                    ${data.currency !== 'THB' ? `(฿${data.calculatedPrice.thb.toLocaleString()} THB)` : ''}
                  </div>
                </div>

                <div class="field">
                  <div class="label">Travel Supplement:</div>
                  <div class="value">${data.travelSupplement}%</div>
                </div>

                <div class="field">
                  <div class="label">Timeline:</div>
                  <div class="value">${data.timeline}</div>
                </div>

                <div class="highlight">
                  <strong>Submitted:</strong> ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      userConfirmationHTML = `
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
                <h2>Thank You for Your ${packageNames[data.package] || data.package.toUpperCase()} Package Request!</h2>
              </div>
              <div class="content">
                <p>Thank you for your interest in our <strong>${packageNames[data.package] || data.package.toUpperCase()}</strong> package.</p>

                <p>We have received your quotation request and our team will review your project details. We'll get back to you within 24-48 hours with a detailed proposal tailored to your needs.</p>

                <h3 style="color: #0f172a; margin-top: 20px;">Your Project Details:</h3>
                <div style="background-color: white; padding: 15px; border-left: 4px solid #0f172a; margin: 10px 0;">
                  <p><strong>Package:</strong> ${packageNames[data.package] || data.package.toUpperCase()}</p>
                  <p><strong>Location:</strong> ${data.city}, ${data.country}</p>
                  <p><strong>Size:</strong> ${data.squareMeters} m²</p>
                  <p><strong>Estimated Fee:</strong> ${data.calculatedPrice.currency} ${data.calculatedPrice.selected.toLocaleString()}</p>
                  <p><strong>Timeline:</strong> ${data.timeline}</p>
                </div>

                <p style="margin-top: 20px;">If you have any questions in the meantime, feel free to reply to this email or visit our website at <a href="https://cracks-studio.com">cracks-studio.com</a>.</p>

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
      `;
    } else {
      // Detailed format (from FeesSection copy)
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

      businessOwnerEmailHTML = `
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
      `;

      let userProjectDetailsHTML = '';
      if (projectDetails) {
        userProjectDetailsHTML = `
          <h3 style="color: #0f172a; margin-top: 20px;">Your Project Details:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #0f172a; margin: 10px 0;">
            <p><strong>Location:</strong> ${projectDetails.city}, ${projectDetails.country}</p>
            <p><strong>Business Model:</strong> ${projectDetails.businessModel}</p>
            <p><strong>Size:</strong> ${projectDetails.squareMeters} m²</p>
            <p><strong>Estimated Fee:</strong> ${projectDetails.fee.displayCurrency} ${projectDetails.fee.converted.toLocaleString()}</p>
            <p><strong>Timeline:</strong> ${projectDetails.timeline}</p>
          </div>
        `;
      }

      userConfirmationHTML = `
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
                <h2>Thank You for Your Quotation Request!</h2>
              </div>
              <div class="content">
                <p>Thank you for your interest in Cracks Hospitality Studio.</p>

                <p>We have received your quotation request and our team will review your project details. We'll get back to you within 24-48 hours with a detailed proposal tailored to your needs.</p>

                ${userProjectDetailsHTML}

                <p style="margin-top: 20px;">If you have any questions in the meantime, feel free to reply to this email or visit our website at <a href="https://cracks-studio.com">cracks-studio.com</a>.</p>

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
      `;
    }

    // Send email to business owner
    await transporter.sendMail({
      from: `"Cracks Studio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: userEmail,
      subject: `New Quotation Request from ${userEmail}`,
      html: businessOwnerEmailHTML,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Cracks Hospitality Studio" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: 'Your Quotation Request - Cracks Hospitality Studio',
      html: userConfirmationHTML,
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
