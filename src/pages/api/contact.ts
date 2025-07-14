import type { APIRoute } from 'astro';
import { createBucketClient } from '../../lib/cosmic';
import { sendContactNotification, sendContactConfirmation, type ContactFormData } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const contactData: ContactFormData = {
      firstName: formData.get('first-name') as string,
      lastName: formData.get('last-name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || undefined,
      interest: formData.get('interest') as string || undefined,
      message: formData.get('message') as string,
    };

    // Validate required fields
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Store in Cosmic CMS
    const cosmic = createBucketClient();
    try {
      await cosmic.objects.insertOne({
        title: `Contact from ${contactData.firstName} ${contactData.lastName}`,
        type: 'contact-submissions',
        status: 'published',
        metadata: {
          first_name: contactData.firstName,
          last_name: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone || '',
          interest: contactData.interest || '',
          message: contactData.message,
          submitted_at: new Date().toISOString(),
        },
      });
    } catch (cosmicError) {
      console.error('Error saving to Cosmic CMS:', cosmicError);
      // Continue with email sending even if Cosmic storage fails
    }

    // Send notification email to tony@cosmicjs.com
    try {
      await sendContactNotification(contactData);
    } catch (notificationError) {
      console.error('Error sending notification email:', notificationError);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send confirmation email to the sender
    try {
      await sendContactConfirmation(contactData);
    } catch (confirmationError) {
      console.error('Error sending confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};