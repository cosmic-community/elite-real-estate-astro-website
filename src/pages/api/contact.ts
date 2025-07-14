import type { APIRoute } from 'astro';
import { cosmicClient } from '../../lib/cosmic';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create contact submission in Cosmic
    await cosmicClient.objects.insertOne({
      title: `Contact from ${name}`,
      type: 'contact-submissions',
      metadata: {
        name,
        email,
        phone,
        message,
        submitted_at: new Date().toISOString()
      }
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit contact form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};