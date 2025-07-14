import { cosmicClient } from '../../lib/cosmic';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Contact API route called');
    
    // Check if request has form data
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid content type. Expected multipart/form-data',
          received: contentType 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const formData = await request.formData();
    console.log('Form data received:', Object.fromEntries(formData.entries()));
    
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const interest = formData.get('interest') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      const missingFields = [];
      if (!firstName) missingFields.push('first-name');
      if (!lastName) missingFields.push('last-name');
      if (!email) missingFields.push('email');
      if (!message) missingFields.push('message');
      
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          missing_fields: missingFields,
          received_data: {
            'first-name': firstName,
            'last-name': lastName,
            email: email,
            phone: phone,
            interest: interest,
            message: message
          }
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
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

    console.log('Attempting to save to Cosmic CMS:', contactSubmission);

    try {
      const response = await cosmicClient.objects.insertOne(contactSubmission);
      console.log('Cosmic CMS response:', response);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Contact form submitted successfully',
          id: response.object.id,
          data: {
            name: `${firstName} ${lastName}`,
            email: email,
            submitted_at: contactSubmission.metadata.submitted_at
          }
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } catch (cosmicError) {
      console.error('Cosmic CMS error:', cosmicError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save to database',
          details: cosmicError instanceof Error ? cosmicError.message : 'Unknown database error',
          form_data_received: true
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('General error in contact API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};

// Handle preflight OPTIONS requests for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

// Add GET method for testing
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ 
      message: 'Contact API is working',
      methods: ['POST'],
      expected_fields: ['first-name', 'last-name', 'email', 'phone', 'interest', 'message'],
      timestamp: new Date().toISOString()
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
};