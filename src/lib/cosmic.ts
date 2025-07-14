import { createBucketClient } from '@cosmicjs/sdk';
import type { Agent, Property, Office, AboutPage, ContactSubmission } from '../types';

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
});

// Agent functions
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects.find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function getAgent(slug: string): Promise<Agent | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'agents', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}

// Property functions
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects.find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects.find({ 
      type: 'properties',
      'metadata.listing_agent': agentId
    })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    console.error('Error fetching properties by agent:', error);
    return [];
  }
}

// Office functions
export async function getOffices(): Promise<Office[]> {
  try {
    const response = await cosmic.objects.find({ type: 'offices' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    console.error('Error fetching offices:', error);
    return [];
  }
}

export async function getOffice(slug: string): Promise<Office | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'offices', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    console.error('Error fetching office:', error);
    return null;
  }
}

// About page functions
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'about-page' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

// Contact submission functions
export async function createContactSubmission(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
}): Promise<ContactSubmission | null> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Contact from ${data.first_name} ${data.last_name}`,
      type: 'contact-submissions',
      metadata: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || '',
        interest: data.interest || '',
        message: data.message,
        submitted_at: new Date().toISOString(),
      },
    });
    return response.object;
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return null;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const response = await cosmic.objects.find({ type: 'contact-submissions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
}