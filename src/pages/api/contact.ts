import { cosmicClient } from '../../lib/cosmic';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const interest = formData.get('interest') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create contact submission in Cosmic CMS
    const contactSubmission = {
      title: `Contact from ${firstName} ${lastName}`,
      type: 'contact-submissions',
      metadata: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || '',
        interest: interest || '',
        message: message,
        submitted_at: new Date().toISOString()
      }
    };

    const response = await cosmicClient.objects.insertOne(contactSubmission);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        id: response.object.id 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit contact form' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};