import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
}

export async function sendContactNotification(data: ContactFormData) {
  try {
    const response = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
            ${data.interest ? `<p><strong>Interest:</strong> ${data.interest}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3182ce; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px;">
            <p>This email was sent from the Elite Real Estate contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}

export async function sendContactConfirmation(data: ContactFormData) {
  try {
    const response = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: data.email,
      subject: 'Thank you for contacting Elite Real Estate',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a365d; margin-bottom: 10px;">Elite Real Estate</h1>
            <p style="color: #718096; font-size: 16px;">Thank you for reaching out to us!</p>
          </div>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">Hello ${data.firstName},</h2>
            <p style="line-height: 1.6; color: #4a5568;">
              Thank you for contacting Elite Real Estate. We have received your message and will get back to you within 24 hours.
            </p>
            
            <p style="line-height: 1.6; color: #4a5568;">
              Our team of real estate professionals is excited to help you with your ${data.interest ? data.interest.toLowerCase() : 'real estate'} needs.
            </p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3182ce; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Your Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #4a5568;">${data.message}</p>
          </div>
          
          <div style="background-color: #e6fffa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">What happens next?</h3>
            <ul style="color: #4a5568; line-height: 1.6;">
              <li>We'll review your inquiry within 24 hours</li>
              <li>One of our experienced agents will contact you directly</li>
              <li>We'll schedule a consultation at your convenience</li>
              <li>We'll provide you with expert guidance for your real estate needs</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #2d3748;">Contact Information</h3>
            <p style="color: #4a5568; margin: 5px 0;">
              <strong>Phone:</strong> <a href="tel:+1555123456" style="color: #3182ce;">(555) 123-4567</a>
            </p>
            <p style="color: #4a5568; margin: 5px 0;">
              <strong>Email:</strong> <a href="mailto:info@eliterealestate.com" style="color: #3182ce;">info@eliterealestate.com</a>
            </p>
            <p style="color: #4a5568; margin: 5px 0;">
              <strong>Address:</strong> 123 Main Street, Suite 456, Downtown, NY 10001
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; text-align: center;">
            <p>Best regards,<br>The Elite Real Estate Team</p>
            <p style="margin-top: 20px;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}